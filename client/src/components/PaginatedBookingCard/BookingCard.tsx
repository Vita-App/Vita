import React from 'react';
import Grid from '@mui/material/Grid';
import { Chip, Typography, Paper, Dialog } from '@mui/material';
import { StyledButton as Button } from 'components/common';
import DatePicker from 'components/DaterPicker';
import { Topic } from 'types';
import { colorPalatte } from 'data';
import { authState, mentorState } from 'store';
import { useRecoilValue } from 'recoil';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { blue } from '@mui/material/colors';
interface BookingCardProps {
  topic: Topic;
  topics: Topic[];
}
const BookingCard: React.FC<BookingCardProps> = ({ topic, topics }) => {
  const navigate = useNavigate();
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
          // spacing={1}
          container
          direction="row"
          // JustifyContent="center"
          alignItems="center">
          <Grid item xs={12} sm={2} sx={{ px: 2, py: { xs: 1, sm: 0 } }}>
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
            sx={{ color: 'white', px: 2, py: { xs: 1, sm: 0 } }}>
            <Typography variant="h6" sx={{ fontWeight: 800 }}>
              {topicName}
            </Typography>
            <Typography
              variant="body2"
              sx={{ paddingBottom: '8px', opacity: 0.6 }}>
              {topicDescription}
            </Typography>
          </Grid>
          {auth.user?._id !== mentor._id && mentor.is_mentoring && (
            <Grid
              item
              xs={12}
              sm={2}
              sx={{ px: 2, pb: { xs: 1, sm: 0 }, width: '100%' }}>
              <Button
                sx={{
                  padding: { sx: '4px !important', sm: 1 },
                  backgroundColor: blue[900],
                  width: '100%',
                  fontWeight: 600,
                  font: '12px',
                  '&:hover': {
                    opacity: 1,
                    backgroundColor: blue[800],
                  },
                }}
                onClick={() => {
                  if (!auth.isLoggedIn) {
                    toast.error('You must be logged in to book a mentorship');
                    navigate('/auth');
                    return;
                  }

                  setOpen(true);
                }}>
                Book
              </Button>
            </Grid>
          )}
        </Grid>
      </Paper>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DatePicker
          topics={topics}
          topic={topic}
          close={() => setOpen(false)}
        />
      </Dialog>
    </>
  );
};

export default BookingCard;
