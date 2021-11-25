import React, { FunctionComponent } from 'react';
import { Text } from '@fluentui/react';
import { myMessageStyle, useMessageStyles } from './styles';

export interface MessageProps {
  text: string;
  mine?: boolean;
  title?: string;
}

const Message: FunctionComponent<MessageProps> = ({ mine, text, title }) => {
  const styles = useMessageStyles();
  return (
    <div className={styles.container}>
      <div style={mine ? myMessageStyle : undefined} className={styles.message}>
        <Text className={styles.title} block nowrap>
          {title}
        </Text>
        <div className={styles.text}>{text}</div>
      </div>
    </div>
  );
};

export default Message;
