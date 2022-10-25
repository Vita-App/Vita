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

export const collection = [
  {
    _id: '01',
    user: 'User1',
    title: 'Notification 1',
    text: 'This is an Unread notification',
    link: 'www.google.com',
    status: 'unread',
    createdAt: '24/11/1998',
    updatedAt: '24/11/1998',
  },
  {
    _id: '02',
    user: 'User1',
    title: 'Notification 2',
    text: 'This is an Read Notification',
    link: 'www.google.com',
    status: 'unread',
    createdAt: '24/11/1998',
    updatedAt: '24/11/1998',
  },
];

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

  const unreads = collection.filter((n) => n.status === 'unread');
  const reads = collection.filter((n) => n.status === 'read');
  const data = query.data?.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );

  return (
    <>
      <Menu anchorEl={anchorEl} open={open} onClose={() => setAnchorEl(null)}>
        <MenuItem>
          <Stack>
            <Typography variant="body1" fontWeight="bold">
              Notifications
            </Typography>
            <Typography variant="caption">
              You have {unreads.length} unread messages
            </Typography>
          </Stack>
        </MenuItem>
        <MenuItem>
          <Typography variant="body1">New</Typography>
        </MenuItem>

        {unreads.map((n) => (
          <MenuItem
            key={n._id}
            onClick={() => {
              if (n.link) {
                navigate(n.link);
              }
            }}>
            <Stack>
              <Typography variant="subtitle1">{n.title}</Typography>
              <Typography variant="caption">{n.text}</Typography>
            </Stack>
          </MenuItem>
        ))}
        <MenuItem>
          <Typography variant="body1">Before That</Typography>
        </MenuItem>
        {reads.map((n) => (
          <MenuItem
            key={n._id}
            onClick={() => {
              if (n.link) {
                navigate(n.link);
              }
            }}>
            <Stack>
              <Typography variant="subtitle1">{n.title}</Typography>
              <Typography variant="caption">{n.text}</Typography>
            </Stack>
          </MenuItem>
        ))}
        {!query.isLoading && (!reads || reads.length === 0) && (
          <MenuItem>
            <Typography variant="caption">
              No Past Read Notifications Available
            </Typography>
          </MenuItem>
        )}
      </Menu>
      <IconButton
        onClick={(e) => {
          setAnchorEl(e.currentTarget);
          mutate.mutate();
        }}>
        <Badge badgeContent={unreads.length} color="secondary">
          <Notifications />
        </Badge>
      </IconButton>
    </>
  );
};

export default Notification;
