import React, { useEffect } from 'react';
import { useSearchParams, useNavigate, useLocation } from 'react-router-dom';
import { Card, Grid, Stack, Typography, Link } from '@mui/material';
import { ReactComponent as EmailSVG } from './email_verification.svg';
import { SERVER_URL } from 'config.keys';
import axios from 'axios';

const EmailVerification = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const { state } = useLocation();

  useEffect(() => {
    if (params.get('token')) {
      axios
        .get(`${SERVER_URL}/api/auth/verify-email`, {
          params: { token: params.get('token') },
        })
        .then(() => {
          navigate('/auth?page=login');
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  const email = state?.email || 'test@google.com';

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
              Didn&apos;t Receive the email? <Link href="#">Resend email</Link>
            </Typography>
          </Stack>
        </Card>
      </Grid>
    </Grid>
  );
};

export default EmailVerification;
