import React from 'react';
import Grid from '@mui/material/Grid';
import { Chip, Typography, Paper } from '@mui/material';
import Button from 'components/common/Button';
import { useTheme } from '@mui/material/styles';
import { green } from '@mui/material/colors';

const BookingCard = () => {
  const topic = 'General Mentorship';
  const topicLabel = 'mentorship';
  // prettier-ignore
  const topicDetails = 'Introduce yourself, define mentoring expectations and goals. Learn and grow together.';
  const theme = useTheme();
  const topicColor = green[500];
  const topicText = theme.palette.getContrastText(topicColor);
  return (
    <Grid
      component={Paper}
      sx={{ backgroundColor: '#121212' }}
      container
      spacing={2}
      direction="row"
      // JustifyContent="center"
      alignItems="center">
      <Grid item xs={12} sm={2}>
        <Chip
          style={{
            fontWeight: 700,
            color: topicText,
            backgroundColor: topicColor,
          }}
          // Size="medium"
          label={topicLabel}
          variant="outlined"
        />
      </Grid>
      <Grid
        item
        container
        direction="column"
        xs={12}
        sm={8}
        sx={{ color: 'white' }}>
        <Typography variant="h6" sx={{ fontWeight: 800 }}>
          {topic}
        </Typography>
        <Typography variant="body2" sx={{ paddingBottom: '8px', opacity: 0.6 }}>
          {topicDetails}
        </Typography>
      </Grid>
      <Grid item xs={12} sm={1}>
        <Button sx={{ p: 1 }}>Book</Button>
      </Grid>
    </Grid>
  );
};

export default BookingCard;
