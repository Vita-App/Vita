import React from 'react';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import { styled } from '@mui/material/styles';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import SettingsIcon from '@mui/icons-material/Settings';
import HelpOutlineRoundedIcon from '@mui/icons-material/HelpOutlineRounded';
import { drawerWidth } from 'utils/settings';

const DrawerWrapper = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  height: '100%',

  '.MuiListItemText-primary': {
    fontSize: '22px',
    fontWeight: 600,
    fontFamily: 'inter',
  },
  '.MuiSvgIcon-root': {
    fontSize: '2.1875rem',
  },
  '.MuiListItem-root': {
    padding: '1rem 1rem',
  },
});

const getIcon = (icon: string) => {
  switch (icon) {
    case 'Bookings':
      return <AccessTimeOutlinedIcon />;
    case 'Settings':
      return <SettingsIcon />;
    case 'Support':
      return <HelpOutlineRoundedIcon />;
    default:
      return <div />;
  }
};

const DrawerItems: React.FC<{
  handleTabIndexChange: (index: number) => void;
}> = ({ handleTabIndexChange }) => {
  const IconData = ['Bookings', 'Settings'];
  return (
    <DrawerWrapper>
      <Toolbar />
      <Divider />
      <List>
        {IconData.map((text, index) => (
          <ListItem
            button
            key={index}
            onClick={() => handleTabIndexChange(index)}>
            <ListItemIcon>{getIcon(text)}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </DrawerWrapper>
  );
};

const DrawerComponenet: React.FC<{
  mobileOpen: boolean;
  handleTabIndexChange: (index: number) => void;
  handleDrawerToggle: () => void;
}> = ({ handleTabIndexChange, handleDrawerToggle, mobileOpen }) => (
  <Box
    component="nav"
    sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
    aria-label="dashboard-drawer">
    {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
    <Drawer
      variant="temporary"
      open={mobileOpen}
      onClose={handleDrawerToggle}
      ModalProps={{
        keepMounted: true, // Better open performance on mobile.
      }}
      sx={{
        display: { xs: 'block', sm: 'none' },
        '& .MuiDrawer-paper': {
          boxSizing: 'border-box',
          width: drawerWidth,
        },
      }}>
      <DrawerItems handleTabIndexChange={handleTabIndexChange} />
    </Drawer>
    <Drawer
      variant="permanent"
      sx={{
        display: { xs: 'none', sm: 'block' },
        '& .MuiDrawer-paper': {
          boxSizing: 'border-box',
          width: drawerWidth,
        },
      }}
      open>
      <DrawerItems handleTabIndexChange={handleTabIndexChange} />
    </Drawer>
  </Box>
);

export default DrawerComponenet;
