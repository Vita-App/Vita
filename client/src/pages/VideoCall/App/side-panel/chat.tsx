import {
  Stack,
  DefaultButton,
  Modal,
  ContextualMenu,
  IconButton,
} from '@fluentui/react';
import { useCallback, useState } from 'react';
import React from 'react';
import { useRecoilValue } from 'recoil';
import {
  message,
  useCloseButtonStyles,
  useModalClassnames,
  modalStyles,
  vFluid,
  vScroll,
} from './styles';
import { messagesState } from 'atoms';
import { Message, Messages } from 'components/VideoCallComponents/chat';

interface ChatPanelProps {
  setPanel?: (arg0: 'people' | 'chat' | '') => void;
}

const ChatPanel: React.FC<ChatPanelProps> = ({ setPanel }) => {
  const messages = useRecoilValue(messagesState);
  const [isModalled, setIsModalled] = useState(false);
  const modalClassnames = useModalClassnames();
  const closeButtonStyles = useCloseButtonStyles();
  const isMobile = window.matchMedia('(max-width: 480px)').matches;
  const onRenderChatContent = useCallback(
    () => (
      <Messages>
        {messages.map((msg) => (
          <Message
            key={msg.id}
            title={msg.author}
            text={msg.text}
            mine={msg.mine}
          />
        ))}
        {!messages.length && <div className={message}>Chat is empty</div>}
      </Messages>
    ),
    [messages],
  );
  const onRenderModal = useCallback(
    () => (
      <Modal
        styles={modalStyles}
        allowTouchBodyScroll
        titleAriaId="chat-modal-title"
        isOpen={isModalled}
        onDismiss={() => setIsModalled(false)}
        isModeless
        containerClassName={modalClassnames.container}
        dragOptions={{
          moveMenuItemText: 'Move',
          closeMenuItemText: 'Close',
          menu: ContextualMenu,
          dragHandleSelector: '#chat-modal-header',
        }}>
        <div id="chat-modal-header" className={modalClassnames.header}>
          <span id="chat-modal-title">Chat</span>
          <IconButton
            title="Minimize"
            styles={closeButtonStyles}
            iconProps={{ iconName: 'Cancel' }}
            ariaLabel="Minimize chat modal"
            onClick={() => setIsModalled(false)}
          />
        </div>

        <div className={modalClassnames.body}>{onRenderChatContent()}</div>
      </Modal>
    ),
    [isModalled, onRenderChatContent, modalClassnames, closeButtonStyles],
  );
  return (
    <Stack verticalAlign="center" className={vFluid}>
      {/* Undock button */}
      {!isModalled && !isMobile && (
        <IconButton
          title="Undock"
          onClick={() => {
            setPanel?.('');
            setIsModalled(true);
          }}
          text="Undock"
          iconProps={{ iconName: 'MiniExpandMirrored' }}
          style={{ margin: '.25em auto' }}
        />
      )}

      {/* Chat content */}
      {!isModalled && (
        <Stack.Item className={vScroll}>{onRenderChatContent()}</Stack.Item>
      )}

      {/* Modal */}
      {isModalled && (
        <Stack
          verticalAlign="center"
          horizontalAlign="center"
          className={message}>
          Chats are open in floating Modal
          <DefaultButton
            onClick={() => setIsModalled(false)}
            text="Open chats here"
            style={{ marginTop: '.5em' }}
          />
        </Stack>
      )}
      {onRenderModal()}
    </Stack>
  );
};

export default ChatPanel;
