import * as React from 'react';
import { useNavigate, Outlet, useLocation } from 'react-router-dom';
import Box from '@mui/material/Box';
import Toolbar from 'components/UserDashboard/Toolbar';
import Drawer from 'components/UserDashboard/Drawer';
import MuiToolbar from '@mui/material/Toolbar';
import { drawerWidth } from 'utils/settings';
import { styled } from '@mui/material/styles';
import ApplicationSubmitted from 'components/Modals/ApplicationSubmitted';

const Container = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  padding: '24px',
  backgroundColor: '#242424',
  [theme.breakpoints.down('sm')]: {
    width: { sm: `calc(100% - ${drawerWidth}px)` },
  },
}));

const ResponsiveDrawer = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [open, setOpen] = React.useState<boolean>(state?.newlyCreated || false);
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);
  const handleTabIndexChange = (index: number) => {
    renderPage(index);
  };

  const renderPage = (page: number) => {
    switch (page) {
      case 0:
        return navigate('/dashboard');
      case 1:
        return navigate('/dashboard/settings');
      default:
        return <div>HELLO</div>;
    }
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <ApplicationSubmitted open={open} onClose={() => setOpen(false)} />
      <Toolbar handleDrawerToggle={handleDrawerToggle} />
      <Drawer
        mobileOpen={mobileOpen}
        handleDrawerToggle={handleDrawerToggle}
        handleTabIndexChange={handleTabIndexChange}
      />
      <Container component="main">
        <MuiToolbar />
        {/* {renderPage(tabIndex)} */}
        <Outlet />
      </Container>
    </Box>
  );
};

export default ResponsiveDrawer;
