import React from 'react';
import {
  Accordion as MuiAccordion,
  AccordionDetails as MuiAccordionDetails,
  AccordionProps,
  AccordionSummary as MuiAccordionSummary,
  AccordionSummaryProps,
  Grid,
  Stack,
  Typography,
} from '@mui/material';
import MuiButton from '@mui/material/Button';
import { StyledButton as Button } from 'components/common';
import { styled } from '@mui/material/styles';
import EventAvailableTwoToneIcon from '@mui/icons-material/EventAvailableTwoTone';
import ScheduleRoundedIcon from '@mui/icons-material/ScheduleRounded';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import { BookingType, User } from 'types';
import moment from 'moment';
import { VideoCall } from '@mui/icons-material';
import { useRecoilValue } from 'recoil';
import { authState } from 'store';
import { useMutation, useQueryClient } from 'react-query';
import axios from 'axios';
import { SERVER_URL } from 'config.keys';
import { toast } from 'react-toastify';
import NoBooking from 'components/NoBookingCard';

const GridWrapper = styled(Grid)({
  // margin: '2rem',
  border: '1px solid #6c757d',
  padding: '1rem 2rem',
  borderRadius: '4px',
  fontFamily: 'inter',
  background: 'rgb(0, 0, 0, 0.4)',
  flexDirection: 'column',
  fontWeight: 600,

  '.mentor-text': {
    // color: 'white',
    fontSize: '18px',
  },

  '.time-container': {
    margin: '1rem 0rem',
    display: 'flex',
    padding: '1rem 0 rem',
  },
});

const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&:before': {
    display: 'none',
  },
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor: '#161616',
  border: '0px',
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

const getName = (user: User) => `${user?.first_name} ${user?.last_name}`;

const ExpandMore: React.FC<{ description: string }> = ({ description }) => {
  const [expanded, setExpanded] = React.useState<boolean>(false);

  return (
    <div>
      <Accordion
        expanded={expanded}
        onChange={(event, newExpanded) => setExpanded(newExpanded)}>
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <Typography>Description</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>{description}</Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

const acceptBooking = async (id: string) => {
  const { data } = await axios.get(`${SERVER_URL}/api/booking/accept/${id}`, {
    withCredentials: true,
  });

  return data;
};

const BookingsList: React.FC<{ bookings: BookingType[] }> = ({ bookings }) => {
  const queryClient = useQueryClient();
  const mutation = useMutation(
    'acceptBooking',
    (id: string) => acceptBooking(id),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('getBookings');
      },
      onError: () => {
        toast.error(
          'Something went wrong! Cannot accept the booking right now',
        );
      },
    },
  );
  const { user } = useRecoilValue(authState);
  if (bookings.length === 0) return <NoBooking />;

  return (
    <>
      {bookings.map((booking) => (
        <GridWrapper container sx={{ boxShadow: 3, mt: 2 }} key={booking._id}>
          <Grid item className="mentor-text">
            Session with{' '}
            {user?._id === booking.mentor?._id
              ? getName(booking.mentee)
              : getName(booking.mentor)}{' '}
            on {booking.session.topic}
          </Grid>
          <Grid item className="time-container">
            <EventAvailableTwoToneIcon color="action" />
            <span style={{ padding: '0px 1rem' }}>
              {moment(booking.start_date).format('dddd, MMMM Do YYYY')}
            </span>
            <ScheduleRoundedIcon color="action" />
            <span style={{ padding: '0px 1rem' }}>
              {moment(booking.start_date).format('hh:mm a')}
            </span>
          </Grid>
          {booking.session.description && (
            <Grid item>
              <ExpandMore description={booking.session.description} />
            </Grid>
          )}
          <Grid item mt={1}>
            {booking.google_meeting_link && (
              <a
                style={{ textDecoration: 'none' }}
                href={booking.google_meeting_link}>
                <MuiButton
                  variant="contained"
                  color="success"
                  startIcon={<VideoCall />}>
                  Join Meet
                </MuiButton>
              </a>
            )}
            {booking.status === 'waiting' && (
              <Stack direction="row" spacing={2}>
                <Button
                  disabled={mutation.isLoading}
                  variant="contained"
                  color="primary"
                  onClick={() => mutation.mutate(booking._id)}>
                  Accept
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => console.log('Cancel')}>
                  Cancel
                </Button>
              </Stack>
            )}
          </Grid>
        </GridWrapper>
      ))}
    </>
  );
};

export default BookingsList;
