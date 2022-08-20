import React from 'react';
import { useNavigate } from 'react-router';
import {
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Menu,
  Avatar,
} from '@mui/material';
import { green, red } from '@mui/material/colors';
import { VideoCall, Logout, Settings } from '@mui/icons-material';
import { useRecoilState } from 'recoil';
import { authState } from 'store';
import axios from 'axios';
import { SERVER_URL } from 'config.keys';

interface MenuProps {
  anchorEl: HTMLElement | null;
  onClose: () => void;
  open: boolean;
}

const MenuComponent: React.FC<MenuProps> = ({ anchorEl, open, onClose }) => {
  const [auth, setAuthState] = useRecoilState(authState);
  const navigate = useNavigate();

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
    <Menu open={open} anchorEl={anchorEl} onClose={onClose}>
      <ListItemButton
        disabled={!auth.user?.signup_completed || !auth.user.is_mentor}
        onClick={() => {
          onClose();
          navigate(`/user/${auth.user?._id}`);
        }}>
        <ListItemAvatar>
          <Avatar src={auth.user?.avatar?.url} />
        </ListItemAvatar>
        <ListItemText
          primary={`${auth.user?.first_name} ${auth.user?.last_name}`}
          secondary="View public profile"
        />
      </ListItemButton>
      <ListItemButton
        disabled={!auth.user?.signup_completed}
        onClick={() => {
          onClose();
          navigate(`/dashboard`);
        }}>
        <ListItemAvatar>
          <Avatar sx={{ bgcolor: '#fafafa' }}>
            <VideoCall sx={{ color: green[900] }} />
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary="My Bookings"
          secondary="View and manage all your bookings"
        />
      </ListItemButton>
      <ListItemButton
        disabled={!auth.user?.signup_completed}
        onClick={() => {
          onClose();
          navigate(`/dashboard/settings`);
        }}>
        <ListItemAvatar>
          <Avatar sx={{ bgcolor: '#fafafa' }}>
            <Settings sx={{ color: green[900] }} />
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary="Settings"
          secondary="Update your profile settings"
        />
      </ListItemButton>
      <ListItemButton
        onClick={() => {
          onClose();
          onLogout();
        }}>
        <ListItemAvatar>
          <Avatar sx={{ bgcolor: '#fafafa' }}>
            <Logout sx={{ color: red[700] }} />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Logout" />
      </ListItemButton>
    </Menu>
  );
};

export default MenuComponent;
