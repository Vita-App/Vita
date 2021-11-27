import { Server, Socket } from 'socket.io';
import chalk from 'chalk';
import { nanoid } from 'nanoid';
import roomsCache from '../config/NodeCache';
import { CLIENT_URL } from '../config/keys';
import http from 'http';
import { Room } from '../types';
import getRoomFromLink from '../utils/getRoomFromLink';
const socketService = (httpServer: http.Server): void => {
  const IO_OPTIONS = {
    cors: {
      origin: CLIENT_URL,
      methods: ['GET', 'POST', 'DELETE', 'PATCH', 'UPDATE'],
      credentials: true,
    },
  };

  const io = new Server(httpServer, IO_OPTIONS);

  interface Person {
    sessionId: string;
  }

  interface Register {
    sessionId: string;
    roomId: string;
  }

  io.on('connection', (socket: Socket) => {
    console.log(`A user ${chalk.green(socket.id.slice(0, 5))} conmnection`);

    socket.on('register', ({ sessionId, roomId }: Register) => {
      roomsCache.set<Person>(socket.id, { sessionId });

      /*
          socket joins room with same session id
          This allows for extra layer above socket id so client just communicates with session id
        */
      socket.join(sessionId);

      // join rooms person is already in
      if (roomId) {
        socket.join(roomId);
        io.to(roomId).emit('person_reconnected', {
          sessionId,
        });
      }
    });

    socket.on('create_room', (room: Room, cb) => {
      try {
        // TODO anonymous auth and/or rate limiting
        const roomId = nanoid();
        room.id = roomId;

        socket.join(roomId);
        roomsCache.set<Room>(roomId, room);
        io.to(socket.id).emit('joined_room', room);

        cb({ isError: false });
      } catch (err) {
        console.error(err);
        cb({ isError: true });
      }
    });

    socket.on('join_room', async (opts, cb) => {
      try {
        const { name, link } = opts;
        const room = getRoomFromLink(link);

        if (!room) {
          cb({ error: 'Room not found or invalid input!' });
          return;
        }
        const maxPeople = parseInt(room.opts?.maxPeople || '');
        const sockets = await io.in(room.id).allSockets();
        const peopleCount = sockets.size;
        if (!isNaN(maxPeople) && peopleCount >= maxPeople) {
          cb({
            error: 'Specified room participants limit reached, make a new one!',
          });
          return;
        }

        const { sessionId } = roomsCache.get<Person>(socket.id) || {};
        if (!sessionId) throw Error('No session id');

        socket.join(room.id);
        socket.to(room.id).emit('person_joined', {
          name,
          sessionId,
        });
        io.to(socket.id).emit('joined_room', room);

        cb({ error: undefined });
      } catch (err) {
        console.error('Error creating room', err);
        cb({ error: 'Something went wrong, try again later.' });
      }
    });

    socket.on('leave_room', () => {
      try {
        socket.rooms.forEach((room) => {
          const { sessionId } = roomsCache.get<Person>(socket.id) || {};

          if (room === socket.id || room === sessionId) return;

          socket.leave(room);

          if (sessionId) {
            socket.to(room).emit('person_left', {
              sessionId,
            });
          }
          io.in(room)
            .allSockets()
            .then((sockets) => {
              if (sockets.size === 0) {
                // room is now empty, clear the memory reference
                roomsCache.del(room);
              }
            });
        });
      } catch (err) {
        console.error('Error leaving room 😂', err);
      }
    });

    // Peer reports that the person left
    socket.on('person_left', ({ sessionId }: { sessionId: string }) => {
      try {
        io.to(sessionId).emit('leave_room');
        socket.rooms.forEach((room) => {
          if (room === socket.id) return;
          const { sessionId: mySessionId } =
            roomsCache.get<Person>(socket.id) || {};
          if (room === mySessionId) return;

          io.to(room).emit('person_left', {
            sessionId,
          });
        });
      } catch (err) {
        console.error('Error leaving room 😂', err);
      }
    });

    /*
    messages ('message' events) are send as is to other socket specified by `to` key in data 
    `to` key is removed and `from` is added in delivered message\
    both `to` and `from` are session ids
    */
    socket.on('message', (message) => {
      const { to, ...msg } = message;
      const { sessionId } = roomsCache.get<Person>(socket.id) || {};
      if (!sessionId) return;
      // emit
      socket.to(to).send({
        from: sessionId,
        ...msg,
      });
    });
  });
};

export default socketService;
