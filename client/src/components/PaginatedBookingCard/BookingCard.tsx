import React from 'react';
import Grid from '@mui/material/Grid';
import { Chip, Typography, Paper, Dialog } from '@mui/material';
import { StyledButton as Button } from 'components/common';
import DatePicker from 'components/DaterPicker';
import { Topic } from 'types';
import { colorPalatte } from 'data';
import { authState, mentorState } from 'store';
import { useRecoilValue } from 'recoil';
interface BookingCardProps {
  topic: Topic;
}
const BookingCard: React.FC<BookingCardProps> = ({ topic }) => {
  const auth = useRecoilValue(authState);
  const mentor = useRecoilValue(mentorState);
  const { motivation, topicName, description: topicDescription } = topic;
  const topicColor = colorPalatte[motivation].overlay;
  const [open, setOpen] = React.useState(false);
  const topicText = '#f5f5f5';
  return (
    <>
      <Paper elevation={4}>
        <Grid
          sx={{
            width: '100%',
            backgroundColor: '#121212 !important',
            py: 1,
            my: 1,
            border: '2px ridge rgba(255, 255, 255, 0.12)',
          }}
          container
          direction="row"
          // JustifyContent="center"
          alignItems="center">
          <Grid item xs={12} sm={2} sx={{ px: 2 }}>
            <Chip
              style={{
                width: '100%',
                fontWeight: 700,
                color: topicText,
                backgroundColor: topicColor,
              }}
              // Size="medium"
              label={motivation}
              // variant="outlined"
            />
          </Grid>
          <Grid
            item
            container
            direction="column"
            xs={12}
            sm={8}
            sx={{ color: 'white', px: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 800 }}>
              {topicName}
            </Typography>
            <Typography
              variant="body2"
              sx={{ paddingBottom: '8px', opacity: 0.6 }}>
              {topicDescription}
            </Typography>
          </Grid>
          {auth.user?._id !== mentor._id && (
            <Grid item xs={12} sm={1} sx={{ px: 2 }}>
              <Button sx={{ p: 1 }} onClick={() => setOpen(true)}>
                Book
              </Button>
            </Grid>
          )}
        </Grid>
      </Paper>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DatePicker close={() => setOpen(false)} />
      </Dialog>
    </>
  );
};

export default BookingCard;
