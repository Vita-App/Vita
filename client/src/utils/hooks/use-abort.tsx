import { useCallback } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import toast, { ToastType } from 'components/VideoCallComponents/toast';
import { removeConnectionsSelector, roomState } from 'atoms';
import { socket } from 'service/socket';
interface Args {
  noEmit?: boolean;
}

// funciton leave the room
const useAbort = (): ((arg0?: Args) => void) => {
  const [connections, removeConnections] = useRecoilState(
    removeConnectionsSelector,
  );
  const setRoom = useSetRecoilState(roomState);

  const onAbort = useCallback(
    ({ noEmit }: Args = {}) => {
      removeConnections(connections);
      setRoom(null);
      // dont want to emit because of that
      if (!noEmit) socket.emit('leave_room');
      toast('Room abandoned!', {
        type: ToastType.warning,
      });
    },
    [removeConnections, connections, setRoom, socket],
  );

  return onAbort;
};

//

export default useAbort;
