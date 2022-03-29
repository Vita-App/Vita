import React from 'react';
import { styled } from '@mui/material/styles';
import { Grid, Typography, Avatar, Stack, Card } from '@mui/material';

const StyledCard = styled(Card)({
  borderRadius: '8px',
  padding: '3rem',
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
});

const Cards: React.FC<{
  onClick: (type: 'mentor' | 'mentee') => void;
}> = ({ onClick }) => (
  <Grid container spacing={5}>
    <Grid item xs={12}>
      <Typography variant="h4" color="white">
        {
          "We're glad you're here! How do you want to be a part of this community?"
        }
      </Typography>
    </Grid>
    <Grid item xs={12} md={6}>
      <StyledCard elevation={10} onClick={() => onClick('mentee')}>
        <Stack spacing={2} alignItems="center">
          <Avatar src="/i1.svg" sx={{ width: '150px', height: '150px' }} />
          <Typography variant="body1" fontWeight="bold">
            Community User
          </Typography>
          <Typography variant="body2">
            You will be able to book mentors, join group sessions and more.
          </Typography>
        </Stack>
      </StyledCard>
    </Grid>
    <Grid item xs={12} md={6}>
      <StyledCard elevation={10} onClick={() => onClick('mentor')}>
        <Stack spacing={2} alignItems="center">
          <Avatar src="/i2.svg" sx={{ width: '150px', height: '150px' }} />
          <Typography variant="body1" fontWeight="bold">
            Be a mentor
          </Typography>
          <Typography variant="body2">
            Mentor the global community, and meet new mentees.
          </Typography>
        </Stack>
      </StyledCard>
    </Grid>
  </Grid>
);

export default Cards;
