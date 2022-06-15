import * as React from 'react';
import Box from '@mui/material/Box';
import Toolbar from 'components/UserDashboard/Toolbar';
import Drawer from 'components/UserDashboard/Drawer';
import MuiToolbar from '@mui/material/Toolbar';
import { drawerWidth } from 'utils/settings';
import { styled } from '@mui/material/styles';
import Bookings from './Booking';
import Home from './Home';

const Container = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  padding: '24px',
  backgroundColor: '#242424',
  [theme.breakpoints.down('sm')]: {
    width: { sm: `calc(100% - ${drawerWidth}px)` },
  },
}));

const renderPage = (page: number) => {
  switch (page) {
    case 0:
      return <Home />;
    case 1:
      return <Bookings />;
    case 2:
      return <h1>{page}</h1>;
    case 3:
      return <h1>{page}</h1>;
    default:
      return <div> HELLO</div>;
  }
};

const ResponsiveDrawer = () => {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const [tabIndex, setTabIndex] = React.useState(0);

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);
  const handleTabIndexChange = (index: number) => setTabIndex(index);
  return (
    <Box sx={{ display: 'flex' }}>
      <Toolbar handleDrawerToggle={handleDrawerToggle} />
      <Drawer
        mobileOpen={mobileOpen}
        handleDrawerToggle={handleDrawerToggle}
        handleTabIndexChange={handleTabIndexChange}
      />

      <Container component="main">
        <MuiToolbar />
        {renderPage(tabIndex)}
      </Container>

      {/* {<h1>{tabIndex}</h1>}
      {renderPage(tabIndex)} */}
    </Box>
  );
};

export default ResponsiveDrawer;
