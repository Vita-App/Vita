import React, { useEffect, useState } from 'react';
import axios from 'axios';

import {
  Badge,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';
import { MarkChatReadTwoTone, Notifications } from '@mui/icons-material';
import { grey } from '@mui/material/colors';

import { useQuery, useMutation } from 'react-query';
import { useLocation, useNavigate } from 'react-router-dom';

import { SERVER_URL } from 'config.keys';
import { NotificationType } from 'types';
import { clampString } from 'utils/helper';
import { toast } from 'react-toastify';

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
    onError: () => {
      toast.error('Something went wrong');
    },
  });

  useEffect(() => {
    query.refetch();
  }, [pathname]);

  const data = query.data?.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );

  const unreads = data?.filter((item) => item.status === 'unread') || [];
  const reads = data?.filter((item) => item.status === 'read') || [];

  return (
    <>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={() => setAnchorEl(null)}
        sx={{ '& .MuiPaper-root': { width: 360, maxWidth: '100%' } }}>
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
        {unreads.length !== 0 && (
          <MenuItem
            disableRipple
            sx={{
              '&:hover': {
                backgroundColor: 'transparent',
                cursor: 'default',
              },
            }}>
            <Stack direction="row" justifyContent="space-between" width="100%">
              <Typography variant="h6" fontWeight={700}>
                New
              </Typography>
              <Tooltip title="Mark as read" placement="left">
                <IconButton
                  sx={{ mr: 1 }}
                  onClick={() => mutate.mutate()}
                  disabled={mutate.isLoading}>
                  <MarkChatReadTwoTone />
                </IconButton>
              </Tooltip>
            </Stack>
          </MenuItem>
        )}
        <Divider />
        {unreads.map((n) => (
          <MenuItem
            key={n._id}
            onClick={() => {
              if (n.link) {
                navigate(n.link);
              }
            }}>
            <Stack>
              <Typography variant="body1">
                {clampString(n.title, 50)}
              </Typography>
              <Typography variant="caption" color={grey[400]}>
                {clampString(n.text, 50)}
              </Typography>
            </Stack>
          </MenuItem>
        ))}
        {reads.length !== 0 && unreads.length !== 0 && (
          <MenuItem
            disableRipple
            sx={{
              '&:hover': {
                backgroundColor: 'transparent',
                cursor: 'default',
              },
            }}>
            <Typography variant="h6" fontWeight={700}>
              Before That
            </Typography>
          </MenuItem>
        )}
        <Divider />
        {reads.map((n) => (
          <MenuItem
            key={n._id}
            onClick={() => {
              if (n.link) {
                navigate(n.link);
              }
            }}>
            <Stack>
              <Typography variant="body1">
                {clampString(n.title, 50)}
              </Typography>

              <Typography variant="caption" color={grey[400]}>
                {clampString(n.text, 50)}
              </Typography>
            </Stack>
          </MenuItem>
        ))}
        {!query.isLoading && (!reads || reads.length === 0) && (
          <MenuItem>
            <Typography variant="caption">No Past Notifications</Typography>
          </MenuItem>
        )}
      </Menu>
      <IconButton
        onClick={(e) => {
          setAnchorEl(e.currentTarget);
        }}>
        <Badge badgeContent={unreads.length} color="secondary">
          <Notifications />
        </Badge>
      </IconButton>
    </>
  );
};

export default Notification;
