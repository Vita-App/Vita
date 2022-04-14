import React from 'react';
import Stack from '@mui/material/Stack';
import { Typography } from '@mui/material';
import ChevronLeftOutlined from '@mui/icons-material/ChevronLeftOutlined';
import ChevronRightOutlined from '@mui/icons-material/ChevronRightOutlined';
import { Link, StyledButton } from 'components/common';
import { CarouselToolbarContainer, StyledIconButton } from './Carousel.styles';
interface AppProps {
  prevRef: React.RefObject<HTMLButtonElement>;
  nextRef: React.RefObject<HTMLButtonElement>;
}

const CarouselToolbar: React.FC<AppProps> = ({ prevRef, nextRef }) => (
  <CarouselToolbarContainer>
    <Typography
      variant="h5"
      sx={{
        fontWeight: 700,
        color: '#f5f5f5',
        fontSize: '1.8rem',
        paddingRight: '25px',
      }}>
      Get mentorship from Alumni
    </Typography>
    <Stack direction="row" spacing={2}>
      <Link to="/search">
        <StyledButton sx={{ p: 2 }}>Explore all</StyledButton>
      </Link>
      <div>
        <StyledIconButton
          aria-label="previous-page"
          size="medium"
          ref={prevRef}>
          <ChevronLeftOutlined fontSize="inherit" />
        </StyledIconButton>
      </div>
      <div>
        <StyledIconButton aria-label="next page" size="medium" ref={nextRef}>
          <ChevronRightOutlined fontSize="inherit" />
        </StyledIconButton>
      </div>
    </Stack>
  </CarouselToolbarContainer>
);

export default CarouselToolbar;
