import { toast } from 'react-toastify';
import { mergeStyleSets, MessageBar, MessageBarType } from '@fluentui/react';
import React, { ReactText } from 'react';

interface TextProp {
  text: string;
  type?: MessageBarType;
}
const Text: React.FC<TextProp> = ({ text, type }) => (
  <MessageBar messageBarType={type} truncated isMultiline={false}>
    {text}
  </MessageBar>
);

interface ToastOptions {
  type?: MessageBarType;
  [index: string]: any;
}

const myToast = (text: string, options?: ToastOptions): ReactText => {
  const { type, ...rest } = options || {};
  return toast(<Text text={text} type={type} />, rest);
};

export default myToast;
export const dismissToast = toast.dismiss;

export const Timeout = {
  SHORT: 1500,
  MEDIUM: 3000,
  LONG: 5000,
  PERSIST: false,
};

export { MessageBarType as ToastType } from '@fluentui/react';

export const toastClasses = mergeStyleSets({
  container: {
    marginBottom: '.25em !important',
    padding: '0 !important',
    minHeight: '0 !important',
  },
  body: {
    padding: '0 !important',
    width: '100%',
  },
});
