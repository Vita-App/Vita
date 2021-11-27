import React, { useEffect, useState } from 'react';
import type { FunctionComponent } from 'react';
import { useRecoilValue } from 'recoil';
import CommanBar from './command-bar';
import SidePanel from './side-panel';
import VideoBoxes from './video-boxes';
import Connections from './connections';
import Fullscreen from 'components/VideoCallComponents/full-screen';
import { roomState } from 'store';

const App: FunctionComponent = () => {
  const room = useRecoilValue(roomState);
  const [panel, setPanel] = useState<'people' | 'chat' | ''>('');
  const [fullscreen, setFullscreen] = useState(false);

  // !RISHABHCHECK
  const onClickChat = () =>
    panel === 'chat' ? setPanel('') : setPanel('chat');
  const onClickPeople = () =>
    panel === 'people' ? setPanel('') : setPanel('people');
  const onClickFullscreen = () => setFullscreen(!fullscreen);

  useEffect(() => {
    document.title =
      room?.name ||
      (room?.created_by && `Meeting by ${room?.created_by}`) ||
      'Vita - Meet';
    return () => {
      document.title = 'Vita Meet';
    };
  }, [room]);

  return (
    <Fullscreen on={fullscreen} dblclick fullbody>
      <CommanBar
        onClickFullscreen={onClickFullscreen}
        onClickChat={onClickChat}
        onClickPeople={onClickPeople}
      />
      <VideoBoxes />

      <SidePanel
        setPanel={setPanel}
        panel={panel}
        onDismiss={() => setPanel('')}
      />

      <Connections />
    </Fullscreen>
  );
};

export default App;
