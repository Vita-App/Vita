import React from 'react';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { StyledButton as Button } from 'components/common';
import { styled } from '@mui/material/styles';
import EventAvailableTwoToneIcon from '@mui/icons-material/EventAvailableTwoTone';
import ScheduleRoundedIcon from '@mui/icons-material/ScheduleRounded';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';

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

const BookingList = () => {
  const firstName = 'Rishabh';
  const lastName = 'Malhotra';
  const mentorName = `${firstName} ${lastName}`;

  const date = new Date();

  const dayString = date.toLocaleString('default', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });
  const timeString = `${date.getHours()}:00 - ${date.getHours() + 1}:00`;

  return (
    <GridWrapper container lg={8} sx={{ boxShadow: 3 }}>
      <Grid item className="mentor-text">
        Mentorship session with {mentorName}
      </Grid>
      <Grid item className="time-container">
        <EventAvailableTwoToneIcon color="action" />
        <span style={{ padding: '0px 1rem' }}>{dayString}</span>
        <ScheduleRoundedIcon color="action" />
        <span style={{ padding: '0px 1rem' }}>{timeString}</span>
      </Grid>
      <Grid item>
        <ExpandMore />
      </Grid>
    </GridWrapper>
  );
};

const UpcomingBooking = () => (
  <>
    <BookingList />
  </>
);
const PendingBooking = () => (
  <>
    <div>
      You have no upcoming bookings - start sharing a conversation with a
      mentor.
    </div>
    <Button sx={{ my: 2, backgroundColor: '#3e3e3e' }}>Explore Mentors</Button>
    <Button>Explore Mentors</Button>
  </>
);
const PastBooking = () => (
  <>
    <div>
      You have no upcoming bookings - start sharing a conversation with a
      mentor.
    </div>
    <Button>Explore Mentors</Button>
  </>
);

const Bookings = () => {
  const [value, setValue] = React.useState('1');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <Typography
        variant="h3"
        fontFamily="inter"
        fontWeight={600}
        paddingBottom={2}>
        Bookings
      </Typography>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Upcoming" value="1" />
            <Tab label="Pending" value="2" />
            <Tab label="Past" value="3" />
          </TabList>
        </Box>
        <TabPanel value="1" style={{ padding: '1rem 0rem' }}>
          <UpcomingBooking />
        </TabPanel>
        <TabPanel value="2">
          <PendingBooking />
        </TabPanel>
        <TabPanel value="3">
          <PastBooking />
        </TabPanel>
      </TabContext>
    </Box>
  );
};

export default Bookings;

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
