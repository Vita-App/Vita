import React, { TextField, IconButton, Stack } from '@fluentui/react';
import { nanoid } from 'nanoid';
import {
  FunctionComponent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { messages, fluid } from './styles';
import { addMessageSelector, Message, preferencesState } from '../../atoms';

const Messages: FunctionComponent = ({ children }) => {
  const addMessage = useSetRecoilState(addMessageSelector);
  const { name } = useRecoilValue(preferencesState);
  const [message, setMessage] = useState('');

  const scrolling = useRef<HTMLDivElement>(null);
  const scrollToBottom = () => {
    const s = scrolling.current;
    s?.scrollTo(0, s?.scrollHeight);
  };

  useEffect(() => {
    scrollToBottom();
  }, [children]);

  const handleSubmit = useCallback(() => {
    if (!message.trim()) return;
    const msg: Message = {
      id: nanoid(),
      mine: true,
      text: message,
      author: name,
    };
    addMessage([msg]);
    setMessage('');
  }, [message, addMessage, name]);
  return (
    <Stack
      verticalFill
      verticalAlign="space-between"
      className={messages.container}>
      <div ref={scrolling} className={messages.children}>
        {children}
      </div>
      <Stack.Item disableShrink className={messages.type}>
        <TextField
          className={fluid}
          multiline
          autoAdjustHeight
          placeholder="Type message"
          value={message}
          onChange={(_, val) => val !== undefined && setMessage(val)}
          onKeyPress={(e) => {
            if (e.shiftKey && e.key === 'Enter') handleSubmit();
          }}
        />
        <IconButton
          onClick={handleSubmit}
          title="Send (shift+enter)"
          iconProps={{ iconName: 'Send' }}
        />
      </Stack.Item>
    </Stack>
  );
};

export default Messages;
