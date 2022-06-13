import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Button,
  Card,
  Grid,
  LinearProgress,
  Stack,
  TextField,
  Typography,
  Box,
  Avatar,
} from '@mui/material';
import { Warning } from '@mui/icons-material';
import axios from 'axios';
import { SERVER_URL } from 'config.keys';
import useHttp from 'hooks/useHttp';
import { toast } from 'react-toastify';

const ForgotPassword = () => {
  const ref = useRef<HTMLInputElement>();
  const { loading, sendRequest, error: httpError } = useHttp();
  const [params] = useSearchParams();
  const [verified, setVerified] = useState(false);
  const [invalidToken, setInvalidToken] = useState(false);

  useEffect(() => {
    console.log('Mounting');
    if (params.get('token')) {
      axios
        .get(`${SERVER_URL}/api/auth/verify-email`, {
          params: { token: params.get('token') },
        })
        .then(() => {
          setVerified(true);
        })
        .catch(() => {
          setInvalidToken(true);
        });
    }

    return () => {
      console.log('Unmounting');
    };
  }, []);

  const onSendMail = () => {
    sendRequest(
      async () => {
        const response = await axios.post(`${SERVER_URL}/api/send-email`, {
          email: ref.current!.value.trim(),
          template: 'reset',
        });
        return response.data;
      },
      (data: any) => {
        if (data.success) {
          toast.success(
            "We've sent you an email with a link to reset your password.",
            {
              autoClose: false,
            },
          );
        }
      },
    );
  };

  if (verified) {
    return (
      <Grid container>
        <Grid item xs={12} sm={8} md={6} lg={5} mx="auto" my={10}>
          <Card elevation={10}>
            <Stack spacing={3} py={5} px={5} position="relative">
              {loading && (
                <LinearProgress
                  variant="indeterminate"
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                  }}
                />
              )}
              <Typography
                variant="h3"
                fontWeight={600}
                color="white"
                sx={{ pt: 3 }}>
                New Password
              </Typography>
              <TextField
                inputRef={ref}
                label="New Password"
                error={Boolean(httpError)}
              />
              <TextField
                inputRef={ref}
                label="Confirm Password"
                error={Boolean(httpError)}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={onSendMail}
                disabled={loading}>
                Create Password
              </Button>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    );
  }

  if (invalidToken) {
    return (
      <Grid container>
        <Grid item xs={12} sm={8} md={6} lg={5} mx="auto" my={6}>
          <Card elevation={10}>
            <Stack spacing={3} py={5} px={5}>
              <Typography
                variant="h3"
                textAlign="center"
                fontWeight={600}
                color="white"
                sx={{ pt: 3 }}>
                {verified ? 'Verified Successfully!' : 'Invalid Token'}
              </Typography>
              <Box display="flex" justifyContent="center">
                <Avatar
                  sx={{
                    width: '60px',
                    height: '60px',
                    bgcolor: 'transparent',
                    border: `4px solid ${verified ? 'green' : 'red'}`,
                  }}>
                  <Warning
                    sx={{ width: '50px', height: '50px', color: 'red' }}
                  />
                </Avatar>
              </Box>
              <Box>
                <Typography>
                  This link has been expired or invalid. Please try again to{' '}
                </Typography>
                <Typography
                  sx={{ color: 'Highlight', cursor: 'pointer' }}
                  onClick={() => {
                    setInvalidToken(false);
                    setVerified(false);
                  }}>
                  Reset your password
                </Typography>
              </Box>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    );
  }

  return (
    <Grid container>
      <Grid item xs={12} sm={8} md={6} lg={5} mx="auto" my={10}>
        <Card elevation={10}>
          <Stack spacing={3} py={5} px={5} position="relative">
            {loading && (
              <LinearProgress
                variant="indeterminate"
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                }}
              />
            )}
            <Typography
              variant="h3"
              fontWeight={600}
              color="white"
              sx={{ pt: 3 }}>
              Reset Password
            </Typography>
            <TextField
              inputRef={ref}
              label="Email"
              error={Boolean(httpError)}
              helperText={httpError || 'Enter your registered email'}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={onSendMail}
              disabled={loading}>
              Reset Password
            </Button>
          </Stack>
        </Card>
      </Grid>
    </Grid>
  );
};

export default ForgotPassword;
