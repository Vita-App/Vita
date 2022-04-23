import React from 'react';
import { Card, Grid, Typography } from '@mui/material';
import { styled } from '@mui/system';

const ValueCard = () => <Card>hello</Card>;

const MentorValues = () => {
  const mentorValuesData = [
    {
      headline: 'Free of charge',
      description:
        'Mentorship is a two-way street, and for mentors, helping others succeed is rewarding in itself.',
      image: '/Illustration_FreeOfCharge.svg',
    },
    {
      headline: 'Vetted & Verified',
      description:
        'Mentors require a minimum of 5 years of experience in their respective industries to apply on the platform and a passion for mentoring.',
      image: '/Illustration_VettedVerified.svg',
    },
    {
      headline: 'Diverse & Inclusive',
      description:
        'Over 4000 mentors from 60+ different countries, from various industries, and all walks of life.',
      image: '/Illustration_Diversity.svg',
    },
  ];

  const TypographyStyled = styled(Typography)({
    textAlign: 'center',
    fontStyle: 'circular-std',
    fontWeight: 800,
  });

  return (
    <div style={{ width: '100%', color: 'white' }}>
      <TypographyStyled variant="h4">
        Unique stories. Real Experiences.
      </TypographyStyled>
      <TypographyStyled variant="h4">
        Whatever your goals are, there’s a mentor for you.
      </TypographyStyled>

      <Grid container justifyContent={'space-around'}>
        <Grid item m={12}>
          <ValueCard />
        </Grid>
        <Grid item m={12}>
          hello
        </Grid>
        <Grid item m={12}>
          hello
        </Grid>
      </Grid>
    </div>
  );
};

export default MentorValues;
