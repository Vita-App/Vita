import { atom, DefaultValue, selector } from 'recoil';
import { Socket, io } from 'socket.io-client';

declare const window: any;

export const createSocket = (): Socket => {
  const port = process.env.REACT_APP_SOCKET_PORT;
  const { origin } = window.location;
  const url =
    process.env.REACT_APP_SOCKET_URL || `${origin}${port ? `:${port}` : ''}`;
  const socket = io(url, {
    withCredentials: Boolean(process.env.REACT_APP_SOCKET_URL),
  });

  // Socket.onAny((event, ...args) => {
  //     console.log(`got ${event} with args:`, ...args)
  // })

  return socket;
};

// Storing socket
export const socketState = atom<Socket>({
  key: 'socketState',
  default: createSocket(),
});

export interface Room {
  id?: string; // Server version of Room has id required, not here when filling details
  created_by?: string;
  name?: string;
  opts?: {
    maxPeople?: string;
  };
}

// Current room user is in, null redirects to landing page
export const roomState = atom<Room | null>({
  key: 'roomState',
  default: null,
});

export interface RemoteStream {
  stream: MediaStream;
  partnerId: string;
  partnerName?: string;
  isDisplay?: boolean;
}

export const remoteStreamsState = atom<RemoteStream[]>({
  key: 'remoteStreamsState',
  default: [],
});

// Understand what is this function user for???
// append remote stream to the already stream that we have?
export const addRemoteStreamsSelector = selector<RemoteStream[]>({
  key: 'addRemoteStreamsSelector',
  get: ({ get }) => get(remoteStreamsState), // Read the docs
  set: ({ get, set }, newVal) => {
    if (newVal instanceof DefaultValue) {
      throw Error('What were you thinking dude');
    }

    const [user, display] = newVal as (RemoteStream | undefined)[];
    const remoteStreams = get(remoteStreamsState);
    let rStreams = remoteStreams;

    // Adding the user to the remoteStream if its display is on and no in the stream already
    if (
      user &&
      !remoteStreams.find((r) => !r.isDisplay && r.partnerId === user.partnerId)
    ) {
      rStreams = rStreams.concat(user);
    }

    //
    if (
      display &&
      !remoteStreams.find(
        (r) =>
          r.isDisplay &&
          r.partnerId === display.partnerId &&
          r.stream.getVideoTracks()[0].id ===
            display?.stream.getVideoTracks()[0].id,
      )
    ) {
      /* Now allowing multiple display streams, if they reach this point */

      // remove other display tracks
      // remove prev display tracks from this peer, if any
      rStreams = rStreams.filter(({ isDisplay, stream, partnerId }) => {
        if (isDisplay && partnerId === display.partnerId) {
          stream.getTracks().forEach((t) => {
            t.stop();
            stream.removeTrack(t);
          });
          return false;
        }

        return true;
      });
      rStreams = rStreams.concat(display);
    }

    if (!display) {
      // Remove display streams from this peer
      rStreams = rStreams.filter(({ isDisplay, stream, partnerId }) => {
        if (isDisplay && partnerId === user?.partnerId) {
          stream.getTracks().forEach((t) => {
            t.stop();
            stream.removeTrack(t);
          });
          return false;
        }

        return true;
      });
    }

    set(remoteStreamsState, rStreams);
  },
});

export interface Connection {
  partnerId: string;
  initiator: boolean;
  partnerName?: string;
}

export const connectionsState = atom<Connection[]>({
  key: 'connectionsState',
  default: [],
});

// This is used for linkning the connection to all the peers
// for creating the mesh network
export const addConnectionsSelector = selector<Connection[]>({
  key: 'addConnectionsSelector',
  get: ({ get }) => get(connectionsState), // Returns connectionsState as it is
  set: ({ get, set }, newVal) => {
    if (newVal instanceof DefaultValue) {
      throw Error('What were you thinking dude');
    }

    const connections = get(connectionsState);
    const toAdd: Connection[] = [];
    newVal.forEach((val) => {
      if (!connections.find((c) => c.partnerId === val.partnerId)) {
        toAdd.push(val);
      }
    });
    if (toAdd.length) {
      set(connectionsState, connections.concat(toAdd));
    }
  },
});
export const removeConnectionsSelector = selector<Connection[]>({
  key: 'removeConnectionsSelector',
  get: ({ get }) => get(connectionsState), // Returns connectionsState as it is
  set: ({ get, set }, newVal) => {
    if (newVal instanceof DefaultValue) {
      throw Error('What were you thinking dude');
    }

    // Remove remote streams with remote ids as that of vals
    const remoteStreams = get(remoteStreamsState);
    set(
      remoteStreamsState,
      remoteStreams.filter(
        (r) => !newVal.find((v) => v.partnerId === r.partnerId),
      ),
    );

    // Set new connections with val ones removed
    const connections = get(connectionsState);
    set(
      connectionsState,
      connections.filter(
        (c) => !newVal.find((v) => v.partnerId === c.partnerId),
      ),
    );

    // Remove those peers
    if (window.moozPeers) {
      window.moozPeers = window.moozPeers.filter(
        (p: Record<string, unknown>) =>
          !newVal.find((v) => v.partnerId === p.partnerId),
      );
    }
  },
});
