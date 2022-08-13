import React from 'react';
import Appbar from 'components/Appbar';
import AuthForm from 'components/AuthForm';
import { Grid, Container, Card } from '@mui/material';
import { styled } from '@mui/material/styles';
import Footer from 'components/Footer/Footer';

const PageWrapper = styled('div')({
  backgroundColor: 'transparent',
  height: '100vh',
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  overflowX: 'hidden',
  position: 'relative',
});

const Auth = () => (
  <>
    <PageWrapper>
      <Appbar />
      <Container
        sx={{
          my: 5,
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Grid container>
          <Grid item xs={12} md={6} mx="auto">
            <Card elevation={10}>
              <AuthForm />
            </Card>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </PageWrapper>
  </>
);

export default Auth;
