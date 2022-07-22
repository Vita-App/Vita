import React, { useState } from 'react';
import MaterialToolbar from '@mui/material/Toolbar';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import { Menu, MenuItem, IconButton } from '@mui/material';
import { Link, StyledButton as Button } from 'components/common';
import { useRecoilState } from 'recoil';
import { authState } from 'store';
import axios from 'axios';
import { SERVER_URL } from 'config.keys';
import { useNavigate } from 'react-router-dom';
import Notification from 'components/Notification';

const Toolbar = () => {
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
    <div>
      <Menu open={open} anchorEl={anchorEl} onClose={() => setAnchorEl(null)}>
        <MenuItem
          onClick={() => {
            setAnchorEl(null);
            navigate('/dashboard');
          }}>
          Dashboard
        </MenuItem>
        <MenuItem
          onClick={() => {
            setAnchorEl(null);
            onLogout();
          }}>
          Logout
        </MenuItem>
      </Menu>
      <MaterialToolbar>
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
      </MaterialToolbar>
    </div>
  );
};

export default Toolbar;
