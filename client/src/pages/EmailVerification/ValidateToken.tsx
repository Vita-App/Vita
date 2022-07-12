import React from 'react';
import { VerificationResponseType } from 'types';
import { Card, Grid, Stack, Typography, Avatar, Box } from '@mui/material';
import { CheckOutlined, Warning } from '@mui/icons-material';
import { Link } from 'components/common';
import Confetti from 'react-confetti';

const ValidateToken = ({
  data,
}: {
  data: VerificationResponseType | undefined;
}) => (
  <Grid container>
    <Grid item xs={12} sm={8} md={6} lg={5} mx="auto" my={6}>
      <Card elevation={10}>
        <Stack spacing={3} py={5} px={5}>
          {data?.success && <Confetti recycle={false} />}
          <Typography
            variant="h3"
            textAlign="center"
            fontWeight={600}
            color="white"
            sx={{ pt: 3 }}>
            {data?.success ? 'Verified Successfully!' : 'Invalid Token'}
          </Typography>
          <Box display="flex" justifyContent="center">
            <Avatar
              sx={{
                width: '60px',
                height: '60px',
                bgcolor: 'transparent',
                border: `4px solid ${
                  data?.success ? 'success.main' : 'error.main'
                }`,
              }}>
              {data?.success ? (
                <CheckOutlined
                  sx={{ width: '50px', height: '50px', color: 'success.main' }}
                />
              ) : (
                <Warning
                  sx={{ width: '50px', height: '50px', color: 'error.main' }}
                />
              )}
            </Avatar>
          </Box>
          {data?.success ? (
            <Typography>
              You can now proceed to the login page and login with your email
              and password.{' '}
              <Link to="/auth?page=login" sx={{ color: 'Highlight' }}>
                Login
              </Link>
            </Typography>
          ) : (
            <Typography>
              This link has been expired or invalid. Please try again to{' '}
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

export default ValidateToken;
