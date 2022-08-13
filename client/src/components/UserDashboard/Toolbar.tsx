import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import { Link, StyledButton as Button } from 'components/common';
import { drawerWidth } from 'utils/settings';
import { Avatar, Box, Stack } from '@mui/material';
import { useRecoilValue } from 'recoil';
import { authState } from 'store';
import Notification from 'components/Notification';
import MenuComponent from 'components/Menu';
import { APP_NAME } from 'config.keys';

const ToolbarComponent: React.FC<{
  handleDrawerToggle: () => void;
}> = ({ handleDrawerToggle }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const auth = useRecoilValue(authState);

  return (
    <>
      <CssBaseline />
      <MenuComponent
        anchorEl={anchorEl}
        open={open}
        onClose={() => setAnchorEl(null)}
      />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}>
            <MenuIcon />
          </IconButton>
          <Stack
            direction="row"
            spacing={3}
            style={{ width: '100%' }}
            alignItems="center">
            <Box sx={{ flexGrow: 1 }}>
              <Link to="/">
                <Button>{APP_NAME}</Button>
              </Link>
            </Box>
            {auth.isLoggedIn && <Notification />}
            <Link to="/search">
              <Button>Get a match</Button>
            </Link>
            {!auth.isLoggedIn ? (
              <Link to="/auth">
                <Button sx={{ color: '' }}>Login</Button>
              </Link>
            ) : (
              <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
                <Avatar src={auth.user?.avatar?.url} alt={auth.user?.email} />
              </IconButton>
            )}
          </Stack>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default ToolbarComponent;
