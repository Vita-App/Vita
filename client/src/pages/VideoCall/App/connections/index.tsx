import React, { useCallback, useEffect } from 'react';
import type { FunctionComponent } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import toast from 'components/VideoCallComponents/toast';
import Peer from './peer';
import {
  Connection,
  addConnectionsSelector,
  removeConnectionsSelector,
} from 'store';
import { socket } from 'service/socket';

const Connections: FunctionComponent = () => {
  const addConnections = useSetRecoilState(addConnectionsSelector);
  const [connections, removeConnections] = useRecoilState(
    removeConnectionsSelector,
  );

  // This I assume has the session ID
  const onPersonJoined = useCallback(
    (data: { sessionId: string; name: string }) => {
      const { sessionId: partnerId, name: partnerName } = data;
      const connection: Connection = {
        partnerId,
        partnerName,
        initiator: false,
      };
      // SetConnections(connections.concat(connection))
      addConnections([connection]);
    },
    [addConnections],
  );

  const onMessage = useCallback(
    ({ proposal, from, name: partnerName }) => {
      if (proposal) {
        const connection: Connection = {
          partnerId: from,
          initiator: true,
          partnerName,
        };
        // SetConnections(connections.concat(connection))
        addConnections([connection]);
      }
    },
    [addConnections],
  );

  // Remooving the edge from mesh network
  const onPersonLeft = useCallback(
    ({ sessionId }) => {
      const conn = connections.find((c) => c.partnerId === sessionId);
      if (conn) toast(`${conn?.partnerName} left the meeting`);
      // SetConnections(connections.filter(p => p.partnerId !== socketId))
      removeConnections(connections.filter((c) => c.partnerId === sessionId));
    },
    [removeConnections, connections],
  );

  useEffect(() => {
    socket.on('person_joined', onPersonJoined);
    return () => {
      socket.off('person_joined', onPersonJoined);
    };
  }, [onPersonJoined, socket]);

  useEffect(() => {
    socket.on('message', onMessage);
    return () => {
      socket.off('message', onMessage);
    };
  }, [onMessage, socket]);

  useEffect(() => {
    socket.on('person_left', onPersonLeft);
    return () => {
      socket.off('person_left', onPersonLeft);
    };
  }, [onPersonLeft, socket]);

  return (
    <>
      {
        // First you are getting all the connection nodes
        // and then making a link to all those nodes|| Perfect!
        connections.map((conn) => (
          <Peer
            key={conn.partnerId}
            partnerName={conn.partnerName}
            initiator={conn.initiator}
            partnerId={conn.partnerId}
          />
        ))
      }
    </>
  );
};

export default Connections;
