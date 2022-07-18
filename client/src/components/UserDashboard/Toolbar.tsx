import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import { Link, StyledButton as Button } from 'components/common';
import { drawerWidth } from 'utils/settings';
import { Avatar, Box, Menu, MenuItem, Stack } from '@mui/material';
import { useRecoilState } from 'recoil';
import { authState } from 'store';
import { useNavigate } from 'react-router-dom';
import { SERVER_URL } from 'config.keys';
import axios from 'axios';
import Notification from 'components/Notification';

const ToolbarComponent: React.FC<{
  handleDrawerToggle: () => void;
}> = ({ handleDrawerToggle }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const [auth, setAuthState] = useRecoilState(authState);

  const onLogout = async () => {
    try {
      await axios.get(`${SERVER_URL}/api/logout`, { withCredentials: true });
      setAuthState({
        isLoggedIn: false,
        user: null,
        message: 'User is not logged in',
      });
      navigate('/auth');
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <CssBaseline />
      <Menu open={open} anchorEl={anchorEl} onClose={() => setAnchorEl(null)}>
        <MenuItem
          onClick={() => {
            setAnchorEl(null);
            onLogout();
          }}>
          Logout
        </MenuItem>
        <MenuItem
          onClick={() => {
            setAnchorEl(null);
            navigate('/dashboard');
          }}>
          Dashboard
        </MenuItem>
      </Menu>
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
                <Button>VITA APP</Button>
              </Link>
            </Box>
            <Notification />
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
