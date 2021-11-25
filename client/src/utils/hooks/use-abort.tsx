import { useCallback } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import toast, { ToastType } from 'components/VideoCallComponents/toast';
import { removeConnectionsSelector, roomState, socketState } from 'atoms';

interface Args {
  noEmit?: boolean;
}

// funciton leave the room
const useAbort = (): ((arg0?: Args) => void) => {
  const [connections, removeConnections] = useRecoilState(
    removeConnectionsSelector,
  );
  const setRoom = useSetRecoilState(roomState);
  const socket = useRecoilValue(socketState);

  const onAbort = useCallback(
    ({ noEmit }: Args = {}) => {
      removeConnections(connections);
      setRoom(null);
      // dont want to emit because of that
      if (!noEmit) socket.emit('leave_room');
      toast('Room abandoned!, enjoy your lonely life', {
        type: ToastType.warning,
      });
    },
    [removeConnections, connections, setRoom, socket],
  );

  return onAbort;
};

//

export default useAbort;
