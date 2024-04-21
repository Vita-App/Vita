import React from 'react';
import { swipeCardState } from 'store';
import { useRecoilValue } from 'recoil';
import { styled, Typography, Stack, Button } from '@mui/material';
import { Link } from 'components/common';
import { swipeCardsInfo } from 'data';
import TextTransition, { presets } from 'react-text-transition';

const StyledButton = styled(Button)`
  background-size: 200%;
  font-weight: 700;
  color: #f5f5f5;
  font-size: 1rem;
  background-image: linear-gradient(90deg, #3512b2, #d18873);
  box-shadow:
    0 2px 1px transparent,
    0 4px 2px transparent,
    0 8px 4px transparent,
    0 16px 8px transparent,
    0 32px 16px transparent;
  transition: all 0.8s cubic-bezier(0.32, 1.32, 0.42, 0.68);

  /* transition: all 0.8s cubic-bezier(0.32, 1.32, 0.42, 0.68); */
  :hover {
    transform: scale(1.05);
    /* transform: linear-gradient(230deg, #35249b, #8b13c3 50%, #ea577a); */
  }
`;

const Wrapper = styled(Stack)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    alignItems: 'center',
    textAlign: 'center',
  },
  flexDirection: 'column',
  display: 'flex',
  height: '100%',
  justifyContent: 'center',
  padding: '0rem 2rem',
}));

const StyledText = styled(Typography)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    display: 'none',
  },
  color: '#b09aff',
  letterSpacing: '6px',
  fontSize: '24px',
  fontWeight: 800,
  textTransform: 'capitalize',
}));

const LandingHero = () => {
  const idx = useRecoilValue(swipeCardState);

  return (
    <Wrapper spacing={3}>
      <StyledText>SEARCH SCHEDULE MEET</StyledText>
      <Typography
        variant="h3"
        sx={{
          // minHeight: '120px',
          font: 'Inter',
          fontWeight: 800,
          position: 'relative',
        }}>
        <TextTransition
          style={{ width: '100%' }}
          text={swipeCardsInfo[idx]?.info}
          springConfig={presets.stiff}
        />
      </Typography>
      <Link to="/search">
        <StyledButton variant="contained">Find a Mentor ⚡</StyledButton>
      </Link>
    </Wrapper>
  );
};

export default LandingHero;
