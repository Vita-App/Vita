import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import MuiButton from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import { Link, StyledButton as Button } from 'components/common';
import { drawerWidth } from 'utils/settings';
import { Avatar, Box, Stack } from '@mui/material';
import { useRecoilValue } from 'recoil';
import { authState } from 'store';
import Notification from 'components/Notification';
import MenuComponent from 'components/Menu';
import Hidden from '@mui/material/Hidden';
import { APP_NAME, ASSET_FOLDER } from 'config.keys';

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
                <MuiButton>
                  <img
                    src={`/${ASSET_FOLDER}/logo192.png`}
                    alt="logo"
                    width="40px"
                    height="40px"
                  />
                  <Hidden smDown>
                    <strong
                      style={{
                        paddingLeft: '8px',
                        fontSize: '24px',
                        color: 'white',
                      }}>
                      {APP_NAME}
                    </strong>
                  </Hidden>
                </MuiButton>
              </Link>
            </Box>
            {auth.isLoggedIn && <Notification />}
            <Hidden smDown>
              <Link to="/search">
                <Button>Get a match</Button>
              </Link>
            </Hidden>
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
