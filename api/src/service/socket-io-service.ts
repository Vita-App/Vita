import { Server, Socket } from 'socket.io';
import { CORS_REGEX } from '../config/keys';
import http from 'http';

const socketService = (httpServer: http.Server): void => {
  const IO_OPTIONS = {
    cors: {
      origin: new RegExp(CORS_REGEX),
      methods: ['GET', 'POST', 'DELETE', 'PATCH', 'UPDATE'],
      credentials: true,
    },
  };

  const io = new Server(httpServer, IO_OPTIONS);
};

export default socketService;
