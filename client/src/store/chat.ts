import { atom, selector, DefaultValue } from 'recoil';
import toast, { ToastType } from 'components/VideoCallComponents/toast';

declare const window: any;

export interface Message {
  id: string;
  text: string;
  author?: string;
  mine?: boolean;
}

export interface MetaData {
  state: 'NO_STREAM' | 'ONLY_DISPLAY';
}

export interface PeerData {
  message?: Message;
  metadata?: MetaData;
}

export const messagesState = atom<Message[]>({
  key: 'messagesState',
  default: [],
});

export const addMessageSelector = selector<Message[]>({
  key: 'addMessageSelector',
  get: ({ get }) => get(messagesState),
  set: ({ get, set }, newVal) => {
    if (newVal instanceof DefaultValue) {
      throw Error('Nope');
    }

    const messages = get(messagesState);
    set(messagesState, messages.concat(newVal));
    const peers = window.vitaPeers || [];
    newVal.forEach((message) => {
      if (message.mine) {
        peers
          .map((p: any) => p.peer)
          .forEach((peer: any) => {
            try {
              const data: PeerData = { message };
              peer.send(JSON.stringify(data));
            } catch (err) {
              toast('Message could not be sent, try again', {
                type: ToastType.error,
              });
              set(messagesState, messages); // Undo adding newval
            }
          });
      }
    });
  },
});
