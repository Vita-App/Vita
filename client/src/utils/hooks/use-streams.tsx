// @ts-nocheck
import { useCallback, useState } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import {
  audioDevicesState,
  displayStreamState,
  userStreamState,
  videoDevicesState,
  currentCameraIdState,
  currentMicIdState,
  remoteStreamsState,
} from 'atoms';
import toast, { ToastType } from 'components/VideoCallComponents/toast';
import { VIDEO_HEIGHT, ASPECT_RATIO } from 'utils/settings';

interface UserMediaReturn {
  startUserMedia: (device?: MediaDeviceInfo) => Promise<void>;
  stopUserMedia: (kind: 'videoinput' | 'audioinput') => Promise<void>;
}

export const useUserMedia = (): UserMediaReturn => {
  const setCurrentCameraId = useSetRecoilState(currentCameraIdState);
  const setCurrentMicId = useSetRecoilState(currentMicIdState);

  const [userStream, setUserStream] = useRecoilState(userStreamState);
  const setAudioDevices = useSetRecoilState(audioDevicesState);
  const setVideoDevices = useSetRecoilState(videoDevicesState);

  // List of mics and video
  const updateDeviceList = useCallback(async () => {
    if (!navigator.mediaDevices.ondevicechange) {
      navigator.mediaDevices.ondevicechange = updateDeviceList;
    }

    const devices = await navigator.mediaDevices.enumerateDevices();

    const audio = devices.filter((device) => device.kind === 'audioinput');
    const video = devices.filter((device) => device.kind === 'videoinput');

    setAudioDevices(audio);
    setVideoDevices(video);
  }, [setAudioDevices, setVideoDevices]);

  // Pass the device ID -> starting camera/audio (media)
  const start = useCallback(
    async (device?: MediaDeviceInfo) => {
      try {
        // eslint-disable-next-line no-undef
        const config: MediaStreamConstraints = {
          audio: {
            deviceId: device?.deviceId,
            echoCancellation: true,
            noiseSuppression: true,
          },
          video: {
            deviceId: device?.deviceId,
            height: VIDEO_HEIGHT,
            width: VIDEO_HEIGHT * ASPECT_RATIO,
            aspectRatio: ASPECT_RATIO,
            noiseSuppression: true,
            resizeMode: 'none',
          },
        };
        if (device?.kind === 'audioinput') {
          config.video = false;
        } else if (device?.kind === 'videoinput') {
          config.audio = false;
        }

        // Stream of video/audio --> depending upon the config we provide
        const stream = await navigator.mediaDevices.getUserMedia(config);

        // Extra step just to ensure single audio/video track is present
        const audioTracks = stream.getAudioTracks();
        const videoTracks = stream.getVideoTracks();
        if (audioTracks.length > 0) {
          audioTracks.forEach((t, i) => {
            if (i > 0) {
              t.stop();
              stream.removeTrack(t);
              // Removing excess tracks from stream
              // AudioStream[ Track, Track ]
            }
          });
        }

        // we are making sure we take the first video and stopping all other
        if (videoTracks.length > 0) {
          videoTracks.forEach((t, i) => {
            if (i > 0) {
              t.stop();
              stream.removeTrack(t);
            }
          });
        }

        // Set device ids for ui ||
        const audioDeviceId = audioTracks[0]?.getSettings?.()?.deviceId;
        const videoDeviceId = videoTracks[0]?.getSettings?.()?.deviceId;
        if (audioDeviceId) {
          setCurrentMicId(audioDeviceId);
        }

        if (videoDeviceId) {
          setCurrentCameraId(videoDeviceId);
        }

        if (!userStream) {
          // Save new stream as it is
          setUserStream(stream); // Local stream
        } else {
          const audioTrack = stream.getAudioTracks()[0];
          const videoTrack = stream.getVideoTracks()[0];

          // Is there an api to disable?
          if (audioTrack) {
            // Remove prev audio track
            userStream.getAudioTracks().forEach((t) => {
              t.stop();
              userStream.removeTrack(t);
            });
            // Add prev video track, if any, to stream
            const prevVideo = userStream.getVideoTracks()[0];
            if (prevVideo) {
              stream.addTrack(prevVideo);
            }
          }

          if (videoTrack) {
            // Remove prev video track
            userStream.getVideoTracks().forEach((t) => {
              t.stop();
              userStream.removeTrack(t);
            });
            // Add prev audio track, if any, to stream
            const prevAudio = userStream.getAudioTracks()[0];
            if (prevAudio) {
              stream.addTrack(prevAudio);
            }
          }

          // Save new stream
          setUserStream(stream);
        }

        updateDeviceList();
      } catch (error) {
        toast('Error starting user media', { type: ToastType.error });
      }
    },
    [
      setUserStream,
      userStream,
      updateDeviceList,
      setCurrentCameraId,
      setCurrentMicId,
    ],
  );

  const stop = useCallback(
    async (kind: 'audioinput' | 'videoinput') => {
      if (!userStream) return;

      const toStop: MediaStreamTrack[] = [];

      if (kind === 'audioinput') {
        userStream.getAudioTracks().forEach((t) => {
          // T.stop()
          toStop.push(t);
          userStream.removeTrack(t);
        });
        setCurrentMicId(null);
      } else if (kind === 'videoinput') {
        userStream.getVideoTracks().forEach((t) => {
          // T.stop()
          toStop.push(t);
          userStream.removeTrack(t);
        });
        setCurrentCameraId(null);
      }

      if (userStream?.getTracks().length === 0) {
        setUserStream(null);
      } else {
        // Just to trigger rerender of whatever depends on this stream
        const stream = userStream.clone();
        userStream.getTracks().forEach((t) => {
          // T.stop()
          toStop.push(t);
          userStream.removeTrack(t);
        });
        setUserStream(stream);
      }

      toStop.forEach((t) => [t.stop()]);
    },
    [userStream, setUserStream, setCurrentCameraId, setCurrentMicId],
  );

  return {
    startUserMedia: start,
    stopUserMedia: stop,
  };
};

type Status = 'on' | 'off' | 'default';

interface DisplayMediaReturn {
  displayMediaStatus: Status;
  startDisplayMedia: () => Promise<void>;
  stopDisplayMedia: () => Promise<void>;
}
export const useDisplayMedia = (): DisplayMediaReturn => {
  const [displayMedia, setDisplayMedia] = useRecoilState(displayStreamState);
  const [status, setStatus] = useState<Status>('default');
  const isRemoteDisplay = Boolean(
    useRecoilValue(remoteStreamsState).find((r) => r.isDisplay),
  );

  const stop = useCallback(async () => {
    try {
      displayMedia?.getTracks().forEach((track) => track.stop());
      setDisplayMedia(null);
      setStatus('off');
    } catch (err) {
      toast('Error stopping display media', { type: ToastType.error });
    }
  }, [displayMedia, setDisplayMedia]);

  const start = useCallback(async () => {
    try {
      if (isRemoteDisplay) throw Error('No multiple display streams allowed');
      // BUG No Ts definition for getDisplayMedia
      const stream = await (navigator.mediaDevices as any).getDisplayMedia({
        video: { cursor: 'always' },
      });
      stream.getVideoTracks()[0].onended = stop;
      setDisplayMedia(stream);
      setStatus('on');
    } catch (err) {
      toast('Error starting display media', { type: ToastType.error });
    }
  }, [setDisplayMedia, isRemoteDisplay, stop]);

  return {
    displayMediaStatus: status,
    startDisplayMedia: start,
    stopDisplayMedia: stop,
  };
};
