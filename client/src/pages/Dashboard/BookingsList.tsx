import React, { useState } from 'react';
import {
  Accordion as MuiAccordion,
  AccordionDetails as MuiAccordionDetails,
  AccordionProps,
  AccordionSummary as MuiAccordionSummary,
  AccordionSummaryProps,
  Grid,
  Stack,
  Typography,
  Avatar,
} from '@mui/material';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import EventAvailableTwoToneIcon from '@mui/icons-material/EventAvailableTwoTone';
import ScheduleRoundedIcon from '@mui/icons-material/ScheduleRounded';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import { BookingType, BookingTypeUser, UserType } from 'types';
import moment from 'moment';
import { VideoCall } from '@mui/icons-material';
import { useRecoilValue } from 'recoil';
import { authState } from 'store';
import { useMutation, useQueryClient } from 'react-query';
import axios from 'axios';
import { SERVER_URL } from 'config.keys';
import { toast } from 'react-toastify';
import NoBooking from 'components/NoBookingCard';
import { blue, pink, teal } from '@mui/material/colors';
import BookingRejectModal from 'components/Modals/BookingRejectModal';

const GridWrapper = styled(Grid)({
  // margin: '2rem',
  maxWidth: '700px',
  backgroundColor: '#181818',
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

const StyledButton = styled(Button)({
  padding: '4px',
  color: 'white',
  fontWeight: 600,
  '&:hover': {
    opacity: 0.8,
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
  border: '0px 0px 0px 4px solid black',
}));

const getName = (user: BookingTypeUser) =>
  `${user?.first_name} ${user?.last_name}`;

const ExpandMore: React.FC<{ description: string }> = ({ description }) => {
  const [expanded, setExpanded] = React.useState<boolean>(false);

  return (
    <div>
      <Accordion
        expanded={expanded}
        onChange={(event, newExpanded) => setExpanded(newExpanded)}>
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <Typography fontWeight={600}>Description</Typography>
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

const rejectBooking = async (id: string, reason?: string) => {
  const { data } = await axios.post(
    `${SERVER_URL}/api/booking/reject/${id}`,
    {
      reason,
    },
    {
      withCredentials: true,
    },
  );
  return data;
};

const getMentorOrMentee = (user: UserType | null, booking: BookingType) =>
  user?._id === booking.mentor?._id ? booking.mentee : booking.mentor;

const BookingsList: React.FC<{ bookings: BookingType[] }> = ({ bookings }) => {
  const [open, setOpen] = useState(false);
  const [bookingId, setBookingId] = useState('');
  const queryClient = useQueryClient();
  const acceptMutation = useMutation(
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
  const rejectMutation = useMutation(
    'rejectBooking',
    (reason?: string) => rejectBooking(bookingId, reason),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('getBookings');
        setOpen(false);
        toast.success(
          'Booking rejected successfully and mentee has been notified',
        );
      },
      onError: () => {
        toast.error(
          'Something went wrong! Cannot reject the booking right now',
        );
      },
    },
  );

  const { user } = useRecoilValue(authState);
  if (bookings.length === 0) return <NoBooking />;

  return (
    <>
      <BookingRejectModal
        open={open}
        loading={rejectMutation.isLoading}
        onClose={() => setOpen(false)}
        onConfirm={(reason) => {
          rejectMutation.mutate(reason);
        }}
      />
      {bookings.map((booking) => (
        <GridWrapper sx={{ boxShadow: 3, mt: 2 }} key={booking._id}>
          <Grid item container className="mentor-text">
            <Grid item sx={{ my: 1, mr: 2 }}>
              <Avatar src={getMentorOrMentee(user, booking).avatar?.url} />
            </Grid>
            <Grid item xs={8} sm={9} md={10}>
              Session with{' '}
              <Link
                style={{ color: 'lightblue' }}
                to={`/user/${getMentorOrMentee(user, booking)._id}`}>
                {getName(getMentorOrMentee(user, booking))}
              </Link>{' '}
              on {booking.session.topic}
            </Grid>
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
              <ExpandMore
                description={booking.session.description || 'lorem ipsum'}
              />
            </Grid>
          )}
          <Grid item mt={1}>
            {booking.mentor._id === user?._id &&
              booking.status === 'waiting' && (
                <Stack direction="row" spacing={2}>
                  <StyledButton
                    disabled={acceptMutation.isLoading}
                    fullWidth
                    variant="contained"
                    style={{ backgroundColor: blue[900] }}
                    onClick={() => acceptMutation.mutate(booking._id)}>
                    Accept
                  </StyledButton>
                  <StyledButton
                    fullWidth
                    variant="contained"
                    color={'secondary'}
                    style={{ backgroundColor: pink[900] }}
                    onClick={() => {
                      setBookingId(booking._id);
                      setOpen(true);
                    }}>
                    Cancel
                  </StyledButton>
                </Stack>
              )}
            <Stack mt={1} direction="row" spacing={2}>
              {booking.google_meeting_link && (
                <StyledButton
                  href={booking.google_meeting_link || 'https://google.co.in'}
                  variant="contained"
                  fullWidth
                  style={{ backgroundColor: teal[900] }}
                  startIcon={<VideoCall />}>
                  Join Meet
                </StyledButton>
              )}
              {booking.mentor._id !== user?._id && (
                <StyledButton
                  fullWidth
                  variant="contained"
                  style={{ backgroundColor: blue[900], color: 'white' }}>
                  {booking.status === 'accepted' ? 'Accepted' : 'Waiting'}
                </StyledButton>
              )}
            </Stack>
          </Grid>
        </GridWrapper>
      ))}
    </>
  );
};

export default BookingsList;
