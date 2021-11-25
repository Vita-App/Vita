import {
  keyframes,
  mergeStyles,
  Label,
  useTheme,
  IconButton,
  ContextualMenu,
  ContextualMenuItemType,
} from '@fluentui/react';
import { useEffect, useRef, useState } from 'react';
import React, { VideoHTMLAttributes } from 'react';
import toast, { Timeout, ToastType } from './toast';

const fadeInAnim = keyframes({
  from: {
    opacity: 0,
  },
  to: {
    opacity: 1,
  },
});

const fadeIn = mergeStyles({
  animation: `${fadeInAnim} .5s ease-in`,
});

const videoCLassname = mergeStyles({
  display: 'block',
  maxWidth: '100%',
  height: '100%',
  backgroundColor: 'transparent',
});
const videoContainer = mergeStyles({
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
  zIndex: 3,
});
const videoLabel = mergeStyles({
  padding: '.25em .5em',
  zIndex: 1,
});
const bottomRow = mergeStyles({
  position: 'absolute',
  bottom: 0,
  left: 0,
  display: 'flex',
  flexDirection: 'row',
  width: '100%',
  justifyContent: 'space-between',
  zIndex: 2,
});

interface VideoBoxProps extends VideoHTMLAttributes<HTMLVideoElement> {
  stream: MediaStream;
  label?: string;
  noContextualMenu?: boolean;
}
const VideoBox: React.FC<VideoBoxProps> = ({
  stream,
  label,
  noContextualMenu,
  ...props
}) => {
  const theme = useTheme();
  const videoElem = useRef<HTMLVideoElement | null>(null);
  const [mouseEvent, setMouseEvent] = useState<MouseEvent | null>(null);

  useEffect(() => {
    const video = videoElem.current;
    if (video) {
      video.classList.add(fadeIn);
      setTimeout(() => {
        video.classList.remove(fadeIn);
      }, 500);
      video.srcObject = stream;
      video.oncanplay = () => video.play();
    }
  }, [stream, videoElem]);

  const showNotImplemented = () => {
    toast('Not Implemented yet', {
      autoClose: Timeout.SHORT,
      type: ToastType.severeWarning,
    });
  };

  return (
    <div
      onContextMenu={(e) => {
        e.preventDefault();
        setMouseEvent(e as any);
      }}
      className={videoContainer}
      style={{ border: `3px solid ${theme.palette.neutralLighter}` }}>
      <video
        title={label}
        ref={videoElem}
        className={videoCLassname}
        controls={false}
        playsInline
        autoPlay
        {...props}>
        Seriously, How old are you and your browser!
      </video>
      <div className={bottomRow}>
        {label && (
          <Label
            style={{ backgroundColor: theme.palette.neutralLighter }}
            className={videoLabel}>
            {label}
          </Label>
        )}
        {!noContextualMenu && (
          <IconButton
            onClick={(e) => {
              setMouseEvent(e as any);
            }}
            iconProps={{ iconName: 'More' }}
            style={{ backgroundColor: theme.palette.neutralLighter }}
          />
        )}
      </div>
      {!noContextualMenu && (
        <ContextualMenu
          items={[
            {
              key: 'header1',
              itemType: ContextualMenuItemType.Header,
              text: label,
            },
            {
              key: 'mute',
              text: 'Mute',
              iconProps: { iconName: 'MicOff' },
              onClick: showNotImplemented,
            },
            {
              key: 'hide',
              text: 'Hide',
              iconProps: { iconName: 'VideoOff' },
              onClick: showNotImplemented,
            },
            {
              key: 'divider1',
              itemType: ContextualMenuItemType.Divider,
            },
            {
              key: 'kick',
              text: 'Kick out',
              iconProps: { iconName: 'SignOut' },
              onClick: showNotImplemented,
            },
          ]}
          onDismiss={() => {
            setMouseEvent(null);
          }}
          hidden={!mouseEvent}
          target={mouseEvent}
        />
      )}
    </div>
  );
};

export default VideoBox;
