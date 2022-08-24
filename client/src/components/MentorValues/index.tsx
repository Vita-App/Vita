import React from 'react';
import { ValueCard } from './ValueCard';
import { mentorValuesData } from './mentorValuesData';
import { MentorValuesTitle, CardContainer } from './MentorValues.styles';
import { Typography, Box } from '@mui/material';

export const MentorValues = () => (
  <Box
    sx={{
      color: 'white',
      margin: '10% 0%',
      display: { xs: 'none', sm: 'none', md: 'block' },
    }}>
    <MentorValuesTitle>
      <Typography sx={{ typography: { xs: 'h5', sm: 'h4', md: 'h3' } }}>
        Unique stories. Real Experiences.
      </Typography>
      <Typography sx={{ typography: { xs: 'h6', sm: 'h5', md: 'h4' } }}>
        Whatever your goals are, there’s a mentor for you.
      </Typography>
    </MentorValuesTitle>

    <CardContainer>
      {mentorValuesData.map((mentorValue, index) => (
        <ValueCard key={index} cardInfo={mentorValue} />
      ))}
    </CardContainer>
  </Box>
);
