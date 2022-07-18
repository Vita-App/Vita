import React, { useEffect, useState } from 'react';
import axios from 'axios';

import {
  Badge,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from '@mui/material';
import { Notifications } from '@mui/icons-material';

import { useQuery, useMutation } from 'react-query';
import { useLocation, useNavigate } from 'react-router-dom';

import { SERVER_URL } from 'config.keys';
import { NotificationType } from 'types';

const getNotifications = async () => {
  const { data } = await axios.get<NotificationType[]>(
    `${SERVER_URL}/api/notifications`,
    {
      withCredentials: true,
    },
  );

  return data;
};

const markAsRead = async () => {
  const { data } = await axios.get(`${SERVER_URL}/api/notifications/read`, {
    withCredentials: true,
  });

  return data;
};

const Notification = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const query = useQuery('notifications', getNotifications, {
    refetchOnWindowFocus: 'always',
  });
  const mutate = useMutation('markAsRead', markAsRead, {
    onSuccess: () => query.refetch(),
  });

  useEffect(() => {
    query.refetch();
  }, [pathname]);

  const unreads = query.data?.filter((n) => n.status === 'unread').length;
  const data = query.data?.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );

  return (
    <>
      <Menu anchorEl={anchorEl} open={open} onClose={() => setAnchorEl(null)}>
        {data?.map((n) => (
          <MenuItem
            key={n._id}
            onClick={() => {
              if (n.link) {
                navigate(n.link);
              }
            }}>
            <Stack>
              <Typography variant="body1" fontWeight="bold">
                {n.title}
              </Typography>
              <Typography variant="subtitle1">{n.text}</Typography>
            </Stack>
          </MenuItem>
        ))}
        {!query.isLoading && (!data || data.length === 0) && (
          <MenuItem>
            <Typography variant="body1">No notifications</Typography>
          </MenuItem>
        )}
        {query.isLoading && (
          <MenuItem>
            <Typography variant="body1">Loading...</Typography>
          </MenuItem>
        )}
      </Menu>
      <IconButton
        onClick={(e) => {
          setAnchorEl(e.currentTarget);
          mutate.mutate();
        }}>
        <Badge badgeContent={unreads} color="secondary">
          <Notifications />
        </Badge>
      </IconButton>
    </>
  );
};

export default Notification;
