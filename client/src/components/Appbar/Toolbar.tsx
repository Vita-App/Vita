import React, { useState } from 'react';
import MaterialToolbar from '@mui/material/Toolbar';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import { IconButton } from '@mui/material';
import { Link, StyledButton as Button } from 'components/common';
import MuiButton from '@mui/material/Button';
import { useRecoilValue } from 'recoil';
import { authState } from 'store';
import Notification from 'components/Notification';
import MenuComponent from 'components/Menu';
import { APP_NAME, ASSET_FOLDER } from 'config.keys';

const Toolbar = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const auth = useRecoilValue(authState);

  return (
    <div>
      <MenuComponent
        anchorEl={anchorEl}
        open={open}
        onClose={() => setAnchorEl(null)}
      />
      <MaterialToolbar>
        <Stack
          direction="row"
          spacing={3}
          style={{ width: '100%' }}
          alignItems="center">
          <Box sx={{ flexGrow: 1 }}>
            <Link to="/">
              <MuiButton>
                <img
                  src={`/${ASSET_FOLDER}/logo192.png`}
                  alt="logo"
                  width="40px"
                  height="40px"
                />
                <Box
                  sx={{
                    display: { xs: 'none', sm: 'block' },
                  }}>
                  <strong
                    style={{
                      paddingLeft: '8px',
                      fontSize: '24px',
                      color: 'white',
                    }}>
                    {APP_NAME}
                  </strong>
                </Box>
              </MuiButton>
            </Link>
          </Box>
          {auth.isLoggedIn && <Notification />}
          <Box sx={{ display: { xs: 'none', md: 'block' } }}>
            <Link to="/search">
              <Button>Get a match</Button>
            </Link>
          </Box>
          {!auth.isLoggedIn ? (
            <>
              <Link to="/auth">
                <Button sx={{ color: '' }}>Login</Button>
              </Link>
              <Link to="/auth?page=signup">
                <MuiButton color="primary" variant="contained" size="large">
                  Signup
                </MuiButton>
              </Link>
            </>
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
