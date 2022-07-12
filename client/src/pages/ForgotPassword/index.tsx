import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();
  const ref = useRef<HTMLInputElement>();
  const ref1 = useRef<HTMLInputElement>();
  const { loading, sendRequest, error: httpError } = useHttp();
  const [params] = useSearchParams();
  const [verified, setVerified] = useState(false);
  const [invalidToken, setInvalidToken] = useState(false);

  useEffect(() => {
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

  const onResetPassword = () => {
    sendRequest(
      async () => {
        const response = await axios.post(`${SERVER_URL}/api/reset-password`, {
          token: params.get('token'),
          password: ref.current!.value.trim(),
          confirmPassword: ref1.current!.value.trim(),
        });

        return response.data;
      },
      (data: any) => {
        if (data.success) {
          toast.success('Your password has been reset.');
          navigate('/auth');
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
                error={Boolean(httpError?.password)}
                helperText={httpError?.password}
              />
              <TextField
                inputRef={ref1}
                label="Confirm Password"
                error={Boolean(httpError?.confirmPassword)}
                helperText={httpError?.confirmPassword}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={onResetPassword}
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
                    border: `4px solid ${
                      verified ? 'success.main' : 'error.main'
                    }`,
                  }}>
                  <Warning
                    sx={{ width: '50px', height: '50px', color: 'error.main' }}
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
