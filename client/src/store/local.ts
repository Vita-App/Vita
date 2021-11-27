import { atom, AtomEffect, DefaultValue } from 'recoil';

interface Preferences {
  name?: string;
}

const localStorageEffect =
  (key: string): AtomEffect<Preferences> =>
  ({ setSelf, onSet }) => {
    const savedValue = localStorage.getItem(key);
    if (savedValue !== null) {
      setSelf(JSON.parse(savedValue));
    }

    onSet((newValue) => {
      if (newValue instanceof DefaultValue) {
        localStorage.removeItem(key);
      } else {
        localStorage.setItem(key, JSON.stringify(newValue));
      }
    });
  };

export const preferencesState = atom<Preferences>({
  key: 'preferencesState',
  default: {},
  effects_UNSTABLE: [localStorageEffect('PREFERENCES')],
});

export const userStreamState = atom<MediaStream | null>({
  key: 'userMediaState',
  default: null,
});
export const displayStreamState = atom<MediaStream | null>({
  key: 'displayMediaState',
  default: null,
});

// List of audio devices you have
export const audioDevicesState = atom<MediaDeviceInfo[]>({
  key: 'audioDevicesState',
  default: [],
});

export const currentMicIdState = atom<string | null>({
  key: 'currentAudioDevice',
  default: null,
});

export const videoDevicesState = atom<MediaDeviceInfo[]>({
  key: 'videoDevicesState',
  default: [],
});

// Cuurent camera you are using
export const currentCameraIdState = atom<string | null>({
  key: 'currentVideoDevice',
  default: null,
});
