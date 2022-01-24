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

const GridWrapper = styled(Grid)({
  // margin: '2rem',
  border: '1px solid white',
});

const BookingList = () => (
  <GridWrapper container flexDirection={'column'}>
    <Grid item>HEY</Grid>
    <Grid item>1</Grid>
    <Grid item>2</Grid>
  </GridWrapper>
);

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
