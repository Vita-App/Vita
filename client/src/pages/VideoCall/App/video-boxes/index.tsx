import React, { useEffect, useState } from 'react';
import { Stack, Modal, ContextualMenu, useTheme } from '@fluentui/react';
import { useRecoilValue } from 'recoil';
import {
  container,
  gridContainer,
  userMediaContainer,
  displayMediaContainer,
  modalStyles,
  pinnedContainer,
  sideList,
} from './styles';
import useSize from 'utils/hooks/use-video-size';
import {
  userStreamState,
  displayStreamState,
  remoteStreamsState,
  RemoteStream,
} from 'atoms';
import VideoBox from 'components/VideoCallComponents/video';

const AR = 4 / 3;
const SIDE_LIST_WIDTH = 200;

const VideoBoxes: React.FC = () => {
  const theme = useTheme();

  const userMedia = useRecoilValue(userStreamState);
  const displayMedia = useRecoilValue(displayStreamState);
  const remoteStreams = useRecoilValue(remoteStreamsState);

  const [pinnedItem, setPinnedItem] = useState<RemoteStream>();

  const remoteDisplay = remoteStreams.find((r) => r.isDisplay);

  useEffect(() => {
    if (remoteDisplay) setPinnedItem(remoteDisplay);
    else setPinnedItem(undefined);
  }, [remoteDisplay]);

  const { x, y, X } = useSize(remoteStreams.length, AR);

  return (
    <div
      style={{ backgroundColor: theme.semanticColors.bodyBackground }}
      className={container}>
      {/* Grid view */}
      {!pinnedItem && (
        <div className={gridContainer}>
          {remoteStreams.map(({ stream, partnerName }) => (
            <Stack
              key={stream.id}
              style={{
                height: y,
                maxWidth: x,
              }}>
              <VideoBox label={partnerName} stream={stream} />
            </Stack>
          ))}
        </div>
      )}
      {/* Pinned View */}
      {pinnedItem && (
        <div className={pinnedContainer}>
          <Stack
            disableShrink
            verticalFill
            key={pinnedItem.stream.id}
            style={{
              width: X > 768 ? X - SIDE_LIST_WIDTH : X,
            }}>
            <VideoBox
              label={pinnedItem.partnerName}
              stream={pinnedItem.stream}
            />
          </Stack>
          <div className={sideList}>
            {remoteStreams
              .filter(
                (r) => !r.isDisplay || r.partnerId !== pinnedItem.partnerId,
              )
              .map(({ stream, partnerName }) => (
                <Stack
                  key={stream.id}
                  style={{
                    height: SIDE_LIST_WIDTH / AR,
                    width: SIDE_LIST_WIDTH,
                  }}>
                  <VideoBox stream={stream} label={partnerName} />
                </Stack>
              ))}
          </div>
        </div>
      )}

      <div className={userMediaContainer} id="user-media-container" />
      <div className={displayMediaContainer} id="display-media-container" />
      {displayMedia && (
        <Modal
          isBlocking
          isModeless
          isOpen
          styles={modalStyles}
          layerProps={{
            hostId: 'display-media-container',
          }}
          dragOptions={{
            moveMenuItemText: 'Move',
            closeMenuItemText: 'Close',
            menu: ContextualMenu,
          }}>
          <VideoBox
            muted
            stream={displayMedia}
            label="You are sharing your screen"
            noContextualMenu
          />
        </Modal>
      )}
      {userMedia && (
        <Modal
          isBlocking
          isModeless
          isOpen
          styles={modalStyles}
          layerProps={{
            hostId: 'user-media-container',
          }}
          dragOptions={{
            moveMenuItemText: 'Move',
            closeMenuItemText: 'Close',
            menu: ContextualMenu,
          }}>
          <VideoBox muted stream={userMedia} label="You" noContextualMenu />
        </Modal>
      )}
    </div>
  );
};

export default VideoBoxes;
