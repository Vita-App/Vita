import React, { useEffect, useState } from 'react';
import { useSearchParams, useLocation } from 'react-router-dom';
import { Card, Grid, Stack, Typography, Avatar, Box } from '@mui/material';
import { CheckOutlined, Warning } from '@mui/icons-material';
import { Link } from 'components/common';
import { ReactComponent as EmailSVG } from './email_verification.svg';
import { SERVER_URL } from 'config.keys';
import axios from 'axios';

const EmailVerification = () => {
  const [params] = useSearchParams();
  const { state } = useLocation();
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

  const email = state?.email || 'test@google.com';

  if (verified || invalidToken) {
    return (
      <Grid container>
        <Grid item xs={12} sm={8} md={6} lg={5} xl={3} mx="auto" my={6}>
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
                  {verified ? (
                    <CheckOutlined
                      sx={{ width: '50px', height: '50px', color: 'green' }}
                    />
                  ) : (
                    <Warning
                      sx={{ width: '50px', height: '50px', color: 'red' }}
                    />
                  )}
                </Avatar>
              </Box>
              {verified ? (
                <Typography>
                  You can now proceed to the login page and login with your
                  email and password.{' '}
                  <Link to="/auth?page=login" sx={{ color: 'Highlight' }}>
                    Login
                  </Link>
                </Typography>
              ) : (
                <Typography>
                  You have a broken verification link. Please try again to{' '}
                  <Link to="/auth" sx={{ color: 'Highlight' }}>
                    Signup
                  </Link>
                </Typography>
              )}
            </Stack>
          </Card>
        </Grid>
      </Grid>
    );
  }

  return (
    <Grid container>
      <Grid item xs={12} sm={8} md={6} lg={5} xl={3} mx="auto" my={6}>
        <Card elevation={10}>
          <Stack spacing={3} py={5} px={5}>
            <Typography
              variant="h3"
              textAlign="center"
              fontWeight={600}
              color="white"
              sx={{ py: 4 }}>
              Email Verification
              <div className=""></div>
            </Typography>
            <EmailSVG
              style={{ margin: 'auto', fill: '#deecf9', paddingBottom: '1rem' }}
            />
            <Typography fontSize={'24px'} fontWeight={800}>
              Thanks for Signing for a Vita Account
            </Typography>
            <Typography variant="body1" fontWeight={800}>
              Please Verify you account in order to access your Vita Account
            </Typography>
            <Typography>
              We have sent an email to <b>{email}</b> <br />
              To continue, please check your inbox and verify your email
              address.
            </Typography>

            <Typography>
              Didn&apos;t Receive the email? <Link to="#">Resend email</Link>
            </Typography>
          </Stack>
        </Card>
      </Grid>
    </Grid>
  );
};

export default EmailVerification;
