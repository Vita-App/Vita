/// <reference types="react-scripts" />

import Peer from 'simple-peer';

export interface MoozPeer {
  peer: Peer.Instance;
  partnerId: string;
}

declare global {
  interface Window {
    moozPeers: MoozPeer[] | undefined;
  }
}
