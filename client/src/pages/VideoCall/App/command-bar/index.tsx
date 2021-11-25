import React, { FunctionComponent, useState } from 'react';
import {
  CommandBar,
  DefaultButton,
  ThemeProvider,
  useTheme,
} from '@fluentui/react';
import type { ICommandBarItemProps, IButtonProps } from '@fluentui/react';
import { useRecoilValue } from 'recoil';
import { useFullScreen } from 'components/VideoCallComponents/full-screen';
import {
  audioDevicesState,
  videoDevicesState,
  currentCameraIdState,
  currentMicIdState,
  remoteStreamsState,
} from 'atoms';
import { useDisplayMedia, useUserMedia } from 'utils/hooks/use-streams';
import {
  LeaveButtonStyles,
  buttonStyles,
  containerStyles,
  lightOption,
  darkOption,
} from './styles';
import { darkPaletteAlt, lightPaletteAlt } from 'utils/theme/themes';
import {
  useTheme as useThemeType,
  useSetTheme,
} from 'utils/theme/theme-context';
import useAbort from 'utils/hooks/use-abort';
import InfoCallout from 'components/VideoCallComponents/info-callout';

interface MyCommandBarProps {
  onClickPeople?: () => void;
  onClickChat?: () => void;
  onClickFullscreen?: () => void;
}

const MyCommandBar: FunctionComponent<MyCommandBarProps> = ({
  onClickPeople,
  onClickChat,
  onClickFullscreen,
}) => {
  const theme = useTheme();
  const themeType = useThemeType();
  const setTheme = useSetTheme();

  const currentMicId = useRecoilValue(currentMicIdState);
  const currentCameraId = useRecoilValue(currentCameraIdState);
  const audioDevices = useRecoilValue(audioDevicesState);
  const videoDevices = useRecoilValue(videoDevicesState);
  const { displayMediaStatus, startDisplayMedia, stopDisplayMedia } =
    useDisplayMedia();
  const { startUserMedia, stopUserMedia } = useUserMedia();

  const { isFullscreen } = useFullScreen();
  const onAbort = useAbort();

  const isRemoteDisplay = Boolean(
    useRecoilValue(remoteStreamsState).find((r) => r.isDisplay),
  );

  const [mediaBtnsDisabled, setMediaBtnsDisabled] = useState(false);

  const iconMuted = {
    color: theme.palette.neutralDark,
  };

  const items: ICommandBarItemProps[] = [
    {
      iconProps: currentMicId
        ? { iconName: 'Microphone' }
        : { iconName: 'MicOff', style: iconMuted },
      onClick: () => {
        const dummyDevice: any = {
          kind: 'audioinput',
        };
        setMediaBtnsDisabled(true);
        if (!currentMicId)
          startUserMedia(
            audioDevices.length ? audioDevices[0] : dummyDevice,
          ).finally(() => setMediaBtnsDisabled(false));
        else
          stopUserMedia('audioinput').finally(() =>
            setMediaBtnsDisabled(false),
          );
      },
      disabled: mediaBtnsDisabled,
      buttonStyles,
      key: 'audioToggle',
      // IconOnly: true,
      text: 'Audio',
      tooltipHostProps: {
        content: 'Toggle audio',
        delay: 0,
      },
      split: true,
      subMenuProps: !audioDevices.length
        ? undefined
        : {
            items: audioDevices.map((device) => ({
              key: device.deviceId,
              text: device.label,
              iconProps:
                currentMicId === device.deviceId
                  ? { iconName: 'TVMonitorSelected' }
                  : undefined,
              onClick: () => {
                startUserMedia(device);
              },
            })),
          },
    },
    {
      iconProps: currentCameraId
        ? { iconName: 'Video' }
        : { iconName: 'VideoOff', style: iconMuted },
      onClick: () => {
        const dummyDevice: any = {
          kind: 'videoinput',
        };
        setMediaBtnsDisabled(true);
        if (!currentCameraId)
          startUserMedia(
            videoDevices.length ? videoDevices[0] : dummyDevice,
          ).finally(() => setMediaBtnsDisabled(false));
        else
          stopUserMedia('videoinput').finally(() =>
            setMediaBtnsDisabled(false),
          );
      },
      disabled: mediaBtnsDisabled,
      buttonStyles,
      key: 'videoToggle',
      // IconOnly: true,
      text: 'Video',
      tooltipHostProps: {
        content: 'Toggle video',
        delay: 0,
      },
      split: true,
      subMenuProps: !videoDevices.length
        ? undefined
        : {
            items: videoDevices.map((device) => ({
              key: device.deviceId,
              text: device.label,
              iconProps:
                currentCameraId === device.deviceId
                  ? { iconName: 'TVMonitorSelected' }
                  : undefined,
              onClick: () => {
                startUserMedia(device);
              },
            })),
          },
    },
    {
      key: 'screen',
      text: 'Screen',
      // IconOnly: true,
      disabled: displayMediaStatus !== 'on' && isRemoteDisplay,
      iconProps: {
        iconName: 'ScreenCast',
        style: displayMediaStatus !== 'on' ? iconMuted : {},
      },
      tooltipHostProps: {
        content:
          displayMediaStatus === 'on'
            ? 'Stop sharing'
            : !isRemoteDisplay
            ? 'Share your screen'
            : "Someone's already sharing screen",
        delay: 0,
      },
      onClick: () => {
        if (displayMediaStatus === 'on') stopDisplayMedia();
        else startDisplayMedia();
      },
    },
    {
      onClick: onClickChat,
      buttonStyles,
      key: 'chat',
      // IconOnly: true,
      text: 'Chat',
      iconProps: {
        iconName: 'Chat',
      },
      tooltipHostProps: {
        content: 'Open chats',
        delay: 0,
      },
    },
    {
      onClick: onClickPeople,
      buttonStyles,
      key: 'people',
      // IconOnly: true,
      text: 'People',
      iconProps: {
        iconName: 'People',
      },
      tooltipHostProps: {
        content: 'Show participants',
        delay: 0,
      },
    },
  ];
  const overflowProps: IButtonProps = { ariaLabel: 'More commands' };
  const overflowItems: ICommandBarItemProps[] = [
    {
      key: 'theme',
      text: 'Choose theme',
      secondaryText: themeType,
      iconProps: { iconName: 'Contrast' },
      subMenuProps: {
        items: [
          {
            key: 'light',
            text: 'Light',
            className: lightOption,
            onClick: () => themeType === 'dark' && setTheme?.('light'),
          },
          {
            key: 'dark',
            text: 'Dark',
            className: darkOption,
            onClick: () => themeType === 'light' && setTheme?.('dark'),
          },
        ],
      },
    },
    {
      key: 'fullscreen',
      text: 'Toggle fullscreen',
      secondaryText:
        isFullscreen === undefined ? '' : isFullscreen ? 'On' : 'Off',
      iconProps: { iconName: 'Fullscreen' },
      onClick: () => onClickFullscreen?.(),
    },
  ];

  const [showInfo, setShowInfo] = useState(false);

  const farItems: ICommandBarItemProps[] = [
    {
      commandBarButtonAs: ({ text, key }) => (
        <DefaultButton
          onClick={() => onAbort()}
          text={text}
          key={key}
          styles={LeaveButtonStyles}
        />
      ),
      key: 'leave',
      text: 'Leave',
    },
    {
      buttonStyles,
      className: 'commandbar-info-button',
      key: 'info',
      // Text: 'Info',
      // This needs an ariaLabel since it's icon-only
      ariaLabel: 'Info',
      iconOnly: true,
      iconProps: { iconName: 'Info' },
      onClick: () => setShowInfo(!showInfo),
    },
  ];

  const palette = themeType === 'dark' ? darkPaletteAlt : lightPaletteAlt;
  return (
    <ThemeProvider theme={{ ...palette }}>
      <CommandBar
        styles={containerStyles}
        items={items}
        overflowItems={overflowItems}
        overflowButtonProps={overflowProps}
        farItems={farItems}
        ariaLabel="Use left and right arrow keys to navigate between commands"
      />
      {showInfo && (
        <InfoCallout
          onDismiss={() => setShowInfo(false)}
          target=".commandbar-info-button"
          showFooter
        />
      )}
    </ThemeProvider>
  );
};

export default MyCommandBar;
