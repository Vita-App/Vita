import { LoadingButton } from '@mui/lab';
import { Grid, ButtonGroup, Typography, Slide } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react';
import { Google, LinkedIn } from '@mui/icons-material';

const useStyles = makeStyles({
  button: {
    padding: '0 30',
    backgroundColor: 'rgb(59, 57, 57)',
    fontWeight: '700',
    letterSpacing: '0.5',
    color: 'white',
    marginBottom: '20px',
    '&:hover': {
      backgroundColor: 'white',
      color: 'rgb(59, 57, 57)',
    },
  },
});

const LoginPage = () => {
  const [checked, setChecked] = React.useState(true);
  const containerRef = React.useRef(null);

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      direction="column"
      style={{ minHeight: '100vh' }}
      spacing={8}>
      <Grid item ref={containerRef}>
        <Slide direction="up" in={checked} container={containerRef.current}>
          <Typography variant="h1" color="white">
            Login
          </Typography>
        </Slide>
      </Grid>
      <Grid item>
        <Typography variant="p" color="white">
          Welcome back :)
        </Typography>
        <br />
        <Typography variant="p" color="white">
          {`let's get straight to your tasks.`}
        </Typography>
      </Grid>
      <Grid item>
        <Login />
      </Grid>
      <Grid item>
        <Typography variant="p" color="white">
          No account yet? Sign Up here
        </Typography>
      </Grid>
    </Grid>
  );
};

const Login = () => {
  const [loading, setLoading] = React.useState(false);

  const handleClick = () => {
    setLoading(true);
  };

  const classes = useStyles();

  return (
    <Grid container direction="column" alignItems="center" justify="center">
      <ButtonGroup container variant="contained" orientation="vertical">
        <LoadingButton
          onClick={handleClick}
          loading={loading}
          variant="contained"
          className={classes.button}
          startIcon={<Google />}>
          Login with Google
        </LoadingButton>
        <LoadingButton
          onClick={handleClick}
          loading={loading}
          variant="contained"
          className={classes.button}
          startIcon={<LinkedIn />}>
          Login with LinkedIn
        </LoadingButton>
      </ButtonGroup>
    </Grid>
  );
};

export default LoginPage;
