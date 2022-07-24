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
  Avatar,
} from '@mui/material';
import { Link } from 'react-router-dom';
import MuiButton from '@mui/material/Button';
import { StyledButton as Button } from 'components/common';
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
import { blue, pink } from '@mui/material/colors';

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

const getMentorOrMentee = (user: UserType | null, booking: BookingType) =>
  user?._id === booking.mentor?._id ? booking.mentee : booking.mentor;

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
        <GridWrapper sx={{ boxShadow: 3, mt: 2 }} key={booking._id}>
          <Grid item container className="mentor-text">
            <Grid item sx={{ my: 1, mr: 1 }}>
              <Avatar src={getMentorOrMentee(user, booking).avatar?.url} />
            </Grid>
            <Grid item xs={8} sm={9} md={10}>
              Session with{' '}
              <Link
                style={{ color: 'gray' }}
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
          {!booking.session.description && (
            <Grid item>
              <ExpandMore
                description={booking.session.description || 'lorem ipsum'}
              />
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
            {booking.mentor._id === user?._id && booking.status === 'waiting' && (
              <Stack direction="row" spacing={2}>
                <Button
                  disabled={mutation.isLoading}
                  fullWidth
                  variant="contained"
                  style={{ backgroundColor: blue[900] }}
                  onClick={() => mutation.mutate(booking._id)}>
                  Accept
                </Button>
                <Button
                  fullWidth
                  variant="contained"
                  style={{ backgroundColor: pink[900] }}
                  onClick={() => console.log('Cancel')}>
                  Cancel
                </Button>
              </Stack>
            )}
            {booking.mentor._id !== user?._id && (
              <Stack mt={1} alignItems="flex-start" width="100%">
                <Button
                  fullWidth
                  variant="contained"
                  style={{ backgroundColor: blue[900], color: 'white' }}>
                  {booking.status === 'accepted' ? 'Accepted' : 'Waiting'}
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
