import { SpringRef } from 'react-spring';
import { useGesture } from 'react-use-gesture';
import { useRecoilState, SetterOrUpdater } from 'recoil';
import { swipeCardState } from 'store';
import { swipeCardsInfo } from 'data';

export const getGestures = (
  gone: Set<number>,
  set: SpringRef<{ x: number; rot: number; scale: number; y: number }>,
) => {
  const [position, setPosition] = useRecoilState(swipeCardState);

  // Create a gesture, we're interested in down-state, delta (current-pos - click-pos), direction and velocity
  return useGesture(
    // @ts-ignore
    ({ args: [index], down, delta: [xDelta], direction: [xDir], velocity }) => {
      const trigger = velocity > 0.2; // If you flick hard enough it should trigger the card to fly out
      const dir = xDir < 0 ? -1 : 1; // Direction should either point left or right

      if (!down && trigger) {
        gone.add(index); // If button/finger's up and trigger velocity is reached, we flag the card ready to fly out

        if (position !== index - 1) {
          if (index < 0) setPosition(swipeCardsInfo.length - 1);
          else setPosition(index - 1);
        }
      }

      set((i) => {
        if (index !== i) return; // We're only interested in changing spring-data for the current spring
        const isGone = gone.has(index);
        const x = isGone ? (100 + window.innerWidth) * dir : down ? xDelta : 0; // When a card is gone it flys out left or right, otherwise goes back to zero
        const rot = xDelta / 100 + (isGone ? dir * 10 * velocity : 0); // How much the card tilts, flicking it harder makes it rotate faster
        const scale = down ? 1.1 : 1; // Active cards lift up a bit

        return {
          x,
          rot,
          scale,
          delay: undefined,
          config: { friction: 50, tension: down ? 800 : isGone ? 200 : 500 },
        };
      });
      if (!down && gone.size === swipeCardsInfo.length) {
        setPosition(swipeCardsInfo.length - 1);

        setTimeout(() => {
          gone.clear();
          set((i) => final(i));
        }, 600);
      }
    },
  );
};

export const moveCard = (
  gone: Set<number>,
  set: SpringRef<{ x: number; rot: number; scale: number; y: number }>,
  index: number,
  setPosition: SetterOrUpdater<number>,
) => {
  if (index === -1 || gone.has(index)) {
    return;
  }

  gone.add(index); // If button/finger's up and trigger velocity is reached, we flag the card ready to fly out
  setPosition(index - 1);

  const xDelta = 100;
  const isGone = true;
  const velocity = 10;
  const dir = Math.random() - 0.1 > 0 ? 1 : -1;
  const down = false;
  set((i) => {
    if (index !== i) return; // We're only interested in changing spring-data for the current spring
    const x = isGone ? (100 + window.innerWidth) * dir : down ? xDelta : 0; // When a card is gone it flys out left or right, otherwise goes back to zero
    const rot = xDelta / 100 + (isGone ? dir * 10 * velocity : 0); // How much the card tilts, flicking it harder makes it rotate faster
    const scale = down ? 1.1 : 1; // Active cards lift up a bit
    return {
      x,
      rot,
      scale,
      delay: undefined,
      config: { friction: 50, tension: down ? 800 : isGone ? 150 : 500 },
    };
  });
  if (gone.size === swipeCardsInfo.length) {
    setPosition(swipeCardsInfo.length - 1);
    setTimeout(() => {
      gone.clear();
      set((i) => final(i));
    }, 600);
  }
};

export const final = (i: number) => ({
  x: 0,
  y: i * -4,
  scale: 1,
  rot: -5 + Math.random() * 9.5,
  delay: i * 100,
});
export const from = () => ({ x: 1000, rot: 0, scale: 1.5, y: 0 });
export const trans = (r: number, s: number) =>
  ` rotateX(30deg) rotateY(${r / 10}deg) rotateZ(${r}deg) scale(${s})`;
