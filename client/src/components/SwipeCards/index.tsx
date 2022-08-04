import React, { useState, useEffect } from 'react';
import { useSprings, animated, to } from 'react-spring';
import { CardMedia, styled, Card } from '@mui/material';
import { useRecoilState } from 'recoil';
import { swipeCardState } from 'store';
import { swipeCardsInfo } from 'data';
import { getGestures, moveCard, final, from, trans } from './utils';

const Wrapper = styled('div')(({ theme }) => ({
  zIndex: 2,
  position: 'relative',
  display: 'flex',
  flexGrow: 1,
  width: '100%',
  height: '100%',
  justifyContent: 'center',
  alignItems: 'center',
  paddingTop: '4rem',
  [theme.breakpoints.down('sm')]: {
    height: '200px',
  },
  [theme.breakpoints.up('sm')]: {
    height: '300px',
  },
  [theme.breakpoints.up('md')]: {
    height: '400px',
  },
  [theme.breakpoints.up('lg')]: {
    height: '420px',
  },
  [theme.breakpoints.up('xl')]: {
    height: '560px',
  },

  '.swipe__card': {
    position: 'absolute',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

const StyledCard = styled(Card)(({ theme }) => ({
  WebkitUserDrag: 'none',
  boxShadow: 'rgba(0, 0, 0, 0.1) 2px 5px 27px !important',
  [theme.breakpoints.down('sm')]: {
    height: '200px',
    width: '200px',
  },
  [theme.breakpoints.up('sm')]: {
    height: '300px',
    width: '300px',
  },
  [theme.breakpoints.up('md')]: {
    height: '400px',
    width: '400px',
  },
  [theme.breakpoints.up('lg')]: {
    height: '470px',
    width: '430px',
  },
  [theme.breakpoints.up('xl')]: {
    height: '540px',
    width: '540px',
  },
  cursor: 'grabbing',
}));

const SwipeCards = () => {
  const [cursor, setCursor] = useState(true);
  const [gone] = useState<Set<number>>(() => new Set()); // The set flags all the cards that are flicked out
  const [springs, set] = useSprings(swipeCardsInfo.length, (i) => ({
    ...final(i),
    from: from(),
  })); // Create a bunch of springs using the helpers above

  const [position, setPosition] = useRecoilState(swipeCardState);

  useEffect(() => {
    setPosition(swipeCardsInfo.length - 1);
  }, []);

  useEffect(() => {
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
            <StyledCard elevation={6}>
              <CardMedia
                style={{
                  height: '100%',
                  objectFit: 'cover',
                  cursor: cursor ? 'grabbing' : 'grab',
                }}
                id="card-image"
                component="img"
                alt="Card"
                src={swipeCardsInfo[i].src}
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
