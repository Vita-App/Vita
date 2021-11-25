import React, { useEffect, useRef, useState } from 'react';
import fscreen from 'fscreen';
import type { FunctionComponent, PropsWithChildren } from 'react';
import toast, { Timeout, ToastType } from './toast';

interface Props {
  on?: boolean;
  fullbody?: boolean;
  dblclick?: boolean;
}

const Fullscreen: FunctionComponent<PropsWithChildren<Props>> = ({
  on,
  fullbody,
  dblclick,
  ...props
}) => {
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (!fscreen.fullscreenEnabled) return undefined;
    let elem: HTMLElement;
    if (!fullbody && ref.current) elem = ref.current;
    else elem = document.body;
    try {
      if (on && !fscreen.fullscreenElement) {
        fscreen.requestFullscreen(elem);
      } else if (!on && fscreen.fullscreenElement) {
        fscreen.exitFullscreen();
      }
    } catch (err) {
      toast('Fullscreen error', {
        autoClose: Timeout.SHORT,
        type: ToastType.error,
      });
    }

    const handleDblClick = () => {
      if (!dblclick) return;
      try {
        const isFullscreen = Boolean(fscreen.fullscreenElement);
        if (isFullscreen) fscreen.exitFullscreen();
        else {
          fscreen.requestFullscreen(elem);
          toast('Entered into fullscreen mode, double click to toggle', {
            type: ToastType.info,
          });
        }
      } catch (err) {
        toast('Fullscreen error', {
          autoClose: Timeout.SHORT,
          type: ToastType.error,
        });
      }
    };

    elem.addEventListener('dblclick', handleDblClick);
    return () => elem.removeEventListener('dblclick', handleDblClick);
  }, [on, fullbody, dblclick]);
  return <div ref={ref} {...props} />;
};

export default Fullscreen;

export const useFullScreen = (): { isFullscreen: boolean } => {
  const [on, setOn] = useState(Boolean(fscreen.fullscreenElement));

  useEffect(() => {
    const listener = () => {
      if (Boolean(fscreen.fullscreenElement) && !on) {
        setOn(true);
      } else if (!fscreen.fullscreenElement && on) {
        setOn(false);
      }
    };

    fscreen.addEventListener('fullscreenchange', listener);
    return () => fscreen.removeEventListener('fullscreenchange', listener);
  }, [on]);

  return {
    isFullscreen: on,
  };
};
