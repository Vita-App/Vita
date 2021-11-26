import React, {
  FunctionComponent,
  lazy,
  Suspense,
  useEffect,
  ReactNode,
  useRef,
  ReactText,
} from 'react';
import { initializeIcons, mergeStyles, Spinner } from '@fluentui/react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { ToastContainer, Slide } from 'react-toastify';
import { nanoid } from 'nanoid';
import toast, {
  toastClasses,
  dismissToast,
  Timeout,
} from 'components/VideoCallComponents/toast';
import JoinRoom from './JoinRoom';
import { roomState, socketState, Room } from 'atoms';
import ThemeProvider from 'utils/theme/theme-context';
import 'react-toastify/dist/ReactToastify.css';
import useAbort from 'utils/hooks/use-abort';
import { socket } from 'service/socket';

// enforce https in production
// if (
//   window.location.protocol === 'http:' &&
//   process.env.NODE_ENV === 'production'
// ) {
//   window.location.href = `https://${window.location.href.slice(7)}`;
// }

const AppImport = import('pages/VideoCall/App'); // preloading
const App = lazy(() => AppImport);
initializeIcons();

const spinner = mergeStyles({
  height: '100vh',
  overflow: 'hidden',
});

const Eagle: FunctionComponent = () => {
  // const socket = useRecoilValue(socketState);
  // const socket = io(SERVER_URL);
  // console.log(socket);

  const [room, setRoom] = useRecoilState(roomState);
  const onAbort = useAbort();
  const connectToast = useRef<ReactText>();
  useEffect(() => {
    // TODO detect browser close to call this fucn
    // const onCloseWindow = () => {
    //     socket.emit('leave_room')
    // }
    const onRoomJoined = (r: Room) => {
      const name = r.name || `by ${r.created_by}` || `with id ${r.id}`;
      window.history.pushState({}, 'Vita', `/room/${r.id}`);
      setRoom(r);
      toast(`Joined room ${name}`);
    };

    const onLeaveRoom = () => {
      onAbort({ noEmit: true });
    };

    const onDisconnect = () => {
      connectToast.current = toast('Reconnecting socket!', {
        autoClose: Timeout.PERSIST,
      });
    };

    const onConnect = () => {
      const id = sessionStorage.getItem('ID') || nanoid();
      socket.emit('register', { sessionId: id, roomId: room?.id });
      sessionStorage.setItem('ID', id);

      toast('Socket connected!', { autoClose: Timeout.SHORT });
      if (connectToast.current) dismissToast(connectToast.current);
      connectToast.current = undefined;
    };

    socket.on('connect', onConnect);
    socket.on('joined_room', onRoomJoined);
    socket.on('disconnect', onDisconnect);
    socket.on('leave_room', onLeaveRoom);
    return () => {
      socket.off('joined_room', onRoomJoined);
      socket.off('disconnect', onDisconnect);
      socket.off('connect', onConnect);
      socket.off('leave_room', onLeaveRoom);
    };
  }, [setRoom, socket, room, onAbort]);
  let content: ReactNode;
  if (!room) content = <JoinRoom />;
  else content = <App />;

  return (
    <>
      <ToastContainer
        bodyClassName={toastClasses.body}
        toastClassName={toastClasses.container}
        transition={Slide}
        position="bottom-left"
        autoClose={Timeout.MEDIUM}
        closeOnClick={false}
        closeButton={false}
        rtl={false}
        hideProgressBar
        newestOnTop
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      {content}
    </>
  );
};

const VideoCall = () => (
  <ThemeProvider>
    <Suspense
      fallback={<Spinner label="Loading..." className={spinner} size={3} />}>
      {console.log(useRecoilValue(socketState))}
      <Eagle />
    </Suspense>
  </ThemeProvider>
);

export default VideoCall;
