/// <reference types="react-scripts" />

import Peer from 'simple-peer';

export interface VitaPeer {
  peer: Peer.Instance;
  partnerId: string;
}

declare global {
  interface Window {
    vitaPeers: VitaPeer[] | undefined;
  }
}
