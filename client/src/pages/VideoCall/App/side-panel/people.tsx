import React, {
  ReactText,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  Stack,
  Persona,
  List,
  PersonaPresence,
  useTheme,
  PersonaSize,
  IconButton,
  ContextualMenu,
  ContextualMenuItemType,
  DefaultButton,
} from '@fluentui/react';
import { useRecoilValue } from 'recoil';
import type { FunctionComponent } from 'react';
import { vFluid, vScroll, message } from './styles';
import { Connection, connectionsState } from 'atoms';
import InfoCallout from 'components/VideoCallComponents/info-callout';
import toast, {
  dismissToast,
  Timeout,
  ToastType,
} from 'components/VideoCallComponents/toast';

const PersonComponent: FunctionComponent<{
  item?: Connection;
  index?: number;
}> = ({ index, item }) => {
  const [mouseEvent, setMouseEvent] = useState<MouseEvent | null>(null);
  const theme = useTheme();
  const [presence, setPresence] = useState(PersonaPresence.away);
  useEffect(() => {
    const onConnected = () => setPresence(PersonaPresence.online);
    const onClose = () => setPresence(PersonaPresence.offline);
    const { peer } =
      window.vitaPeers?.find((p) => p.partnerId === item?.partnerId) || {};
    peer?.on('connect', onConnected);
    peer?.on('close', onClose);
    return () => {
      peer?.off('connect', onConnected);
      peer?.off('close', onClose);
    };
  }, [item]);
  if (!item || index === undefined) return null;
  const showNotImplemented = () => {
    toast('Not Implemented yet', {
      autoClose: Timeout.SHORT,
      type: ToastType.severeWarning,
    });
  };

  return (
    <>
      <Stack
        key={item.partnerId}
        onContextMenu={(e) => {
          e.preventDefault();
          setMouseEvent(e as any);
        }}
        styles={{
          root: {
            padding: '.5em .75em',
            cursor: 'default',
            ':hover': {
              backgroundColor: theme.semanticColors.listItemBackgroundHovered,
            },
          },
        }}
        horizontal
        horizontalAlign="space-between">
        <Persona
          presence={presence}
          text={item.partnerName || `<${item.partnerId}>`}
          secondaryText="Online"
          size={PersonaSize.size32}
        />
        <IconButton
          onClick={(e) => {
            setMouseEvent(e as any);
          }}
          iconProps={{ iconName: 'More' }}
        />
      </Stack>
      <ContextualMenu
        items={[
          {
            key: 'header1',
            itemType: ContextualMenuItemType.Header,
            text: item.partnerName,
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
    </>
  );
};

const PeoplePanel: FunctionComponent = () => {
  const connections = useRecoilValue(connectionsState);
  const onRenderPerson = useCallback(
    (item?: Connection, index?: number) => (
      <PersonComponent item={item} index={index} />
    ),
    [],
  );
  const [showInfo, setShowInfo] = useState(false);
  const aloneToast = useRef<ReactText>();
  useEffect(() => {
    if (!connections.length && !aloneToast.current)
      aloneToast.current = toast('Empty Room', {
        autoClose: Timeout.PERSIST,
        type: ToastType.blocked,
      });
    else if (connections.length && aloneToast.current) {
      if (aloneToast.current) {
        dismissToast(aloneToast.current);
        aloneToast.current = undefined;
      }
    }
  }, [connections]);
  useEffect(
    () => () => {
      if (aloneToast.current) dismissToast(aloneToast.current);
    },
    [],
  );
  return (
    <Stack verticalAlign="center" className={vFluid}>
      {!connections.length ? (
        <div className={message}>
          <span>
            You are currently alone right now, invite some people to join
          </span>
          <DefaultButton
            onClick={() => setShowInfo(!showInfo)}
            text="Info"
            className="info-button-in-person-list"
            style={{ marginTop: '.5em' }}
          />
        </div>
      ) : (
        <Stack className={vFluid} horizontalAlign="center">
          <DefaultButton
            onClick={() => setShowInfo(!showInfo)}
            text="Info"
            className="info-button-in-person-list"
            style={{ marginBottom: '.5em' }}
          />
          <List
            style={{ width: '100%' }}
            className={vScroll}
            items={connections}
            onRenderCell={onRenderPerson}
          />
        </Stack>
      )}
      {showInfo && (
        <InfoCallout
          onDismiss={() => setShowInfo(false)}
          target=".info-button-in-person-list"
        />
      )}
    </Stack>
  );
};

export default PeoplePanel;
