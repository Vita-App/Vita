import React from 'react';
import { Card, Grid, Stack, Typography, LinearProgress } from '@mui/material';
import { ReactComponent as EmailSVG } from './email_verification.svg';
import { useLocation, Navigate, useNavigate } from 'react-router-dom';
import useHttp from 'hooks/useHttp';
import { APP_NAME, SERVER_URL } from 'config.keys';
import axios from 'axios';
import { toast } from 'react-toastify';

const VerifyEmail = ({ params }: { params: URLSearchParams }) => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { loading, sendRequest } = useHttp();
  const onSendMail = () => {
    sendRequest(
      async () => {
        const response = await axios.post(`${SERVER_URL}/api/send-email`, {
          email: state?.email,
          template: 'verification',
        });

        return response.data;
      },
      (data: any) => {
        if (data.success) {
          toast.success(
            "We've again sent you an email with a link to verify your email.",
            {
              autoClose: false,
            },
          );
        } else {
          toast.error(data.error, {
            autoClose: false,
          });
          navigate('/auth');
        }
      },
    );
  };

  if (!state?.email && !params.get('token')) {
    return <Navigate to="/auth" />;
  }

  return (
    <Grid container>
      <Grid item xs={12} sm={8} md={6} lg={5} mx="auto" my={6}>
        <Card elevation={10}>
          <Stack spacing={3} py={5} px={5} position="relative">
            {loading && (
              <LinearProgress
                variant="indeterminate"
                sx={{ position: 'absolute', top: 0, left: 0, width: '100%' }}
              />
            )}
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
              Thanks for Signing for a {APP_NAME} Account
            </Typography>
            <Typography variant="body1" fontWeight={800}>
              Please Verify you account in order to access your {APP_NAME}{' '}
              Account
            </Typography>
            <Typography>
              We have sent an email to <b>{state?.email}</b> <br />
              To continue, please check your inbox and verify your email
              address.
            </Typography>

            <Typography>
              Didn&apos;t Receive the email?{' '}
              <Typography
                component="span"
                sx={{ color: 'Highlight', cursor: 'pointer' }}
                onClick={onSendMail}>
                Resend email?
              </Typography>
            </Typography>
          </Stack>
        </Card>
      </Grid>
    </Grid>
  );
};

export default VerifyEmail;
