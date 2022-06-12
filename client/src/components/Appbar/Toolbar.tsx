import React from 'react';
import MaterialToolbar from '@mui/material/Toolbar';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import { Link, StyledButton as Button } from 'components/common';
import { useRecoilState } from 'recoil';
import { authState } from 'store';
import axios from 'axios';
import { SERVER_URL } from 'config.keys';
import { useNavigate } from 'react-router-dom';

const Toolbar = () => {
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
      <MaterialToolbar>
        <Stack direction="row" spacing={3} style={{ width: '100%' }}>
          <Box sx={{ flexGrow: 1 }}>
            <Link to="/">
              <Button>VITA APP</Button>
            </Link>
          </Box>
          <Link to="/search">
            <Button>Get a match</Button>
          </Link>
          <Link to="/room">
            <Button>Vita Meet</Button>
          </Link>
          {!auth.isLoggedIn ? (
            <Link to="/auth">
              <Button sx={{ color: '' }}>Login</Button>
            </Link>
          ) : (
            <>
              <Link to="/dashboard">
                <Button sx={{ color: '' }}>Dashboard</Button>
              </Link>
              <Button sx={{ color: '' }} onClick={onLogout}>
                Logout
              </Button>
            </>
          )}
        </Stack>
      </MaterialToolbar>
    </div>
  );
};

export default Toolbar;
