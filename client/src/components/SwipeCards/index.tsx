import React, { useMemo, useState } from 'react';
import { useSprings, animated, to, SpringRef } from 'react-spring';
import { useGesture } from 'react-use-gesture';
import Card from '@mui/material/Card';
import { CardMedia } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useRecoilState, SetterOrUpdater } from 'recoil';
import { swipeCardState } from 'store';
import { FiberSmartRecordTwoTone } from '@mui/icons-material';

const cards = [
  { image: '1.png', color: '#eee' },
  { image: '2.png', color: '#f4f1de' },
  { image: '3.png', color: '#fff1e6' },
  { image: '4.png', color: '#ECE3C9' },
  { image: '5.png', color: '##ffd0d5' },
  { image: '6.png', color: '##a4c9d8' },
];

const Wrapper = styled('div')({
  position: 'relative',
  display: 'flex',
  width: '100%',
  height: '100%',
  justifyContent: 'center',
  alignItems: 'center',

  '.swipe__card': {
    position: 'absolute',
    cursor: 'grab',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const StyledCard = styled(Card)(({ theme }) => ({
  WebkitUserDrag: 'none',
  boxShadow: 'rgba(0, 0, 0, 0.1) 2px 5px 27px !important',
  [theme.breakpoints.down('sm')]: {
    height: '300px',
    width: '300px',
  },
  [theme.breakpoints.up('sm')]: {
    height: '360px',
    width: '360px',
  },
  [theme.breakpoints.up('md')]: {
    height: '400px',
    width: '400px',
  },
  [theme.breakpoints.up('lg')]: {
    height: '500px',
    width: '500px',
  },
  [theme.breakpoints.up('xl')]: {
    height: '200px',
    width: '200px',
  },
  cursor: 'grabbing',
}));

const final = (i: number) => ({
  x: 0,
  y: i * -4,
  scale: 1,
  rot: -5 + Math.random() * 9.5,
  delay: i * 100,
});
const from = (i: number) => ({ x: 1000, rot: 0, scale: 1.5, y: 0 });
const trans = (r: number, s: number) =>
  ` rotateX(30deg) rotateY(${r / 10}deg) rotateZ(${r}deg) scale(${s})`;

const SwipeCards = () => {
  const [cursor, setCursor] = useState(true);
  const [gone] = useState<Set<number>>(() => new Set()); // The set flags all the cards that are flicked out
  const [springs, set] = useSprings(cards.length, (i) => ({
    ...final(i),
    from: from(i),
  })); // Create a bunch of springs using the helpers above
  // console.log(position)

  const [position, setPosition] = useRecoilState(swipeCardState);

  React.useEffect(() => {
    const timeoutID = window.setTimeout(() => {
      moveCard(gone, set, position, setPosition);
    }, 5000);

    return () => window.clearTimeout(timeoutID);
  }, [position]);

  const bind = getGestures(gone, set);

  return (
    <Wrapper>
      {springs.map(({ x, y, rot, scale }, i) => (
        <animated.div
          key={i}
          className="swipe__card"
          style={{
            transform: to([x, y], (x, y) => `translate3d(${x}px,${y}px,0)`),
          }}>
          <animated.div
            {...bind(i)}
            style={{ transform: to([rot, scale], trans) }}>
            <StyledCard elevation={1}>
              <CardMedia
                style={{ cursor: cursor ? 'grabbing' : 'grab' }}
                id="card-image"
                component="img"
                alt="Card"
                src="./Illustration/Diversity.svg"
                title="Card Image"
                onMouseDown={(e: any) => {
                  e.preventDefault();
                  setCursor(true);
                }}
                onMouseUp={() => setCursor(false)}
              />
            </StyledCard>
          </animated.div>
        </animated.div>
      ))}
    </Wrapper>
  );
};

export default SwipeCards;

const getGestures = (
  gone: Set<number>,
  // setGone: React.Dispatch<React.SetStateAction<Set<number>>>,
  set: SpringRef<{ x: number; rot: number; scale: number; y: number }>,
  // timer: number,
) => {
  const [position, setPosition] = useRecoilState(swipeCardState);

  // Create a gesture, we're interested in down-state, delta (current-pos - click-pos), direction and velocity
  return useGesture(
    // @ts-ignore
    ({ args: [index], down, delta: [xDelta], direction: [xDir], velocity }) => {
      console.log([index], down, [xDelta], [xDir], velocity);
      const trigger = velocity > 0.2; // If you flick hard enough it should trigger the card to fly out
      const dir = xDir < 0 ? -1 : 1; // Direction should either point left or right

      // if (down) clearTimeout(timer);

      if (!down && trigger) {
        gone.add(index); // If button/finger's up and trigger velocity is reached, we flag the card ready to fly out

        if (position !== index - 1) {
          if (index < 0) setPosition(5);
          else setPosition(index - 1);
        }
      }

      set((i) => {
        if (index !== i) return; // We're only interested in changing spring-data for the current spring
        const isGone = gone.has(index);
        const x = isGone ? (100 + window.innerWidth) * dir : down ? xDelta : 0; // When a card is gone it flys out left or right, otherwise goes back to zero
        const rot = xDelta / 100 + (isGone ? dir * 10 * velocity : 0); // How much the card tilts, flicking it harder makes it rotate faster
        const scale = down ? 1.1 : 1; // Active cards lift up a bit

        console.log(x, rot, scale);
        return {
          x,
          rot,
          scale,
          delay: undefined,
          config: { friction: 50, tension: down ? 800 : isGone ? 200 : 500 },
        };
      });
      if (!down && gone.size === cards.length) {
        setPosition(5);
        setTimeout(() => {
          console.log(gone, position);
          gone.clear();
          set((i) => final(i));
        }, 600);
      }
    },
  );
};

const moveCard = (
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
  if (gone.size === cards.length) {
    setTimeout(() => {
      // console.log(gone, position);
      gone.clear();
      set((i) => final(i));
    }, 600);
    setPosition(cards.length - 1);
  }
};
// sbi.50012@sbi.co.in
