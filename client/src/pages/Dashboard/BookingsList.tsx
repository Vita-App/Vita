import React from 'react';
import {
  Accordion as MuiAccordion,
  AccordionDetails as MuiAccordionDetails,
  AccordionProps,
  AccordionSummary as MuiAccordionSummary,
  AccordionSummaryProps,
  Box,
  Grid,
  Typography,
} from '@mui/material';
import { StyledButton as Button } from 'components/common';
import { styled } from '@mui/material/styles';
import EventAvailableTwoToneIcon from '@mui/icons-material/EventAvailableTwoTone';
import ScheduleRoundedIcon from '@mui/icons-material/ScheduleRounded';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import { BookingType, User } from 'types';
import moment from 'moment';

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

const getName = (user: User) => `${user.first_name} ${user.last_name}`;

const NoBooking: React.FC<{ kind: string }> = ({ kind }) => (
  <Box mt={2}>
    <div>
      You have no {kind} bookings - start sharing a conversation with a mentor.
    </div>
    <Button sx={{ my: 2, backgroundColor: '#3e3e3e' }}>Explore Mentors</Button>
  </Box>
);

const ExpandMore = () => {
  const [expanded, setExpanded] = React.useState<boolean>(false);

  // const handleChange = (event: React.SyntheticEvent, newExpanded: boolean) => {
  //   setExpanded(newExpanded);
  // };

  return (
    <div>
      <Accordion
        expanded={expanded}
        onChange={(event, newExpanded) => setExpanded(newExpanded)}>
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <Typography>Collapsible Group Item #1</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget. Lorem ipsum
            dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada
            lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

const BookingsList: React.FC<{ bookings: BookingType[]; kind: string }> = ({
  bookings,
  kind,
}) => {
  if (bookings.length === 0) return <NoBooking kind={kind} />;

  return (
    <>
      {bookings.map((booking) => (
        <GridWrapper container sx={{ boxShadow: 3, mt: 2 }} key={booking._id}>
          <Grid item className="mentor-text">
            Mentorship session with {getName(booking.mentor)}
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
          <Grid item>
            <ExpandMore />
          </Grid>
        </GridWrapper>
      ))}
    </>
  );
};

export default BookingsList;
