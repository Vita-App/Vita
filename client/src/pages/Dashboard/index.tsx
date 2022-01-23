import * as React from 'react';
import Box from '@mui/material/Box';
import Toolbar from 'components/UserDashboard/Toolbar';
import Drawer from 'components/UserDashboard/Drawer';
import { Typography } from '@mui/material';
import MuiToolbar from '@mui/material/Toolbar';
import { drawerWidth } from 'utils/settings';
import { styled } from '@mui/material/styles';

const Container = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  padding: '24px',
  [theme.breakpoints.down('sm')]: {
    width: { sm: `calc(100% - ${drawerWidth}px)` },
  },
}));

const renderPage = (page: number) => {
  switch (page) {
    case 0:
      return <h1>{page}</h1>;
    case 1:
      return <h1>{page}</h1>;
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
        <Typography paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Rhoncus
          dolor purus non enim praesent elementum facilisis leo vel. Risus at
          ultrices mi tempus imperdiet. Semper risus in hendrerit gravida rutrum
          quisque non tellus. Convallis convallis tellus id interdum velit
          laoreet id donec ultrices. Odio morbi quis commodo odio aenean sed
          adipiscing. Amet nisl suscipit adipiscing bibendum est ultricies
          integer quis. Cursus euismod quis viverra nibh cras. Metus vulputate
          eu scelerisque felis imperdiet proin fermentum leo. Mauris commodo
          quis imperdiet massa tincidunt. Cras tincidunt lobortis feugiat
          vivamus at augue. At augue eget arcu dictum varius duis at consectetur
          lorem. Velit sed ullamcorper morbi tincidunt. Lorem donec massa sapien
          faucibus et molestie ac.
        </Typography>
        <Typography paragraph>
          Consequat mauris nunc congue nisi vitae suscipit. Fringilla est
          ullamcorper eget nulla facilisi etiam dignissim diam. Pulvinar
          elementum integer enim neque volutpat ac tincidunt. Ornare suspendisse
          sed nisi lacus sed viverra tellus. Purus sit amet volutpat consequat
          mauris. Elementum eu facilisis sed odio morbi. Euismod lacinia at quis
          risus sed vulputate odio. Morbi tincidunt ornare massa eget egestas
          purus viverra accumsan in. In hendrerit gravida rutrum quisque non
          tellus orci ac. Pellentesque nec nam aliquam sem et tortor. Habitant
          morbi tristique senectus et. Adipiscing elit duis tristique
          sollicitudin nibh sit. Ornare aenean euismod elementum nisi quis
          eleifend. Commodo viverra maecenas accumsan lacus vel facilisis. Nulla
          posuere sollicitudin aliquam ultrices sagittis orci a.
        </Typography>
      </Container>

      {/* {<h1>{tabIndex}</h1>}
      {renderPage(tabIndex)} */}
    </Box>
  );
};

export default ResponsiveDrawer;
