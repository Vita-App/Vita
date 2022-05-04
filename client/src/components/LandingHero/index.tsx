import React from 'react';
import { swipeCardState } from 'store';
import { useRecoilValue } from 'recoil';
import { styled, Typography, Stack, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const StyledButton = styled(Button)`
  background-size: 200%;
  font-weight: 700;
  color: #f5f5f5;
  font-size: 1rem;
  background-image: linear-gradient(90deg, #3512b2, #d18873);
  box-shadow: 0 2px 1px transparent, 0 4px 2px transparent,
    0 8px 4px transparent, 0 16px 8px transparent, 0 32px 16px transparent;
  transition: all 0.8s cubic-bezier(0.32, 1.32, 0.42, 0.68);

  /* transition: all 0.8s cubic-bezier(0.32, 1.32, 0.42, 0.68); */
  :hover {
    transform: scale(1.05);
    /* transform: linear-gradient(230deg, #35249b, #8b13c3 50%, #ea577a); */
  }
`;

const Wrapper = styled(Stack)({
  flexDirection: 'column',
  height: '100%',
  justifyContent: 'center',
});
const StyledText = styled(Typography)({
  color: '#877bd5',
  letterSpacing: '8px',
  fontSize: '24px',
  fontWeight: 500,
  textTransform: 'capitalize',
});

const LandingHero = () => {
  const position = useRecoilValue(swipeCardState);

  return (
    <Wrapper spacing={3}>
      <StyledText>SEARCH SCHEDULE MEET</StyledText>
      <Typography variant="h3" sx={{ font: 'Inter', fontWeight: 800 }}>
        position : {position}
      </Typography>
      <Link to="/search">
        <StyledButton variant="contained">Find a Mentor ⚡</StyledButton>
      </Link>
    </Wrapper>
  );
};

export default LandingHero;
