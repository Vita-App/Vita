import React, { useState } from 'react';
import { Link } from 'components/common';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import { Avatar, Typography, Checkbox, Button } from '@mui/material';
import { Google } from '@mui/icons-material';
import Input from './Input';

enum AuthMode {
  login,
  signup,
}

const StyledButton = styled(Button)({
  borderRadius: '10px',
  textTransform: 'capitalize',
});

const AuthForm: React.FC = () => {
  const [authMode, setAuthMode] = useState(AuthMode.login);

  const authSwitchHandler = () => {
    setAuthMode(authMode === AuthMode.login ? AuthMode.signup : AuthMode.login);
  };

  const loginMode = authMode === AuthMode.login;

  return (
    <Stack spacing={3} py={5} px={7}>
      <Avatar src="/logo192.png" />
      <Stack>
        <Typography variant="h4">Welcome Back</Typography>
        <Typography variant="body1" color="textSecondary">
          Please enter your details here to continue...
        </Typography>
      </Stack>
      {!loginMode && (
        <Stack>
          <Input label="Username" required placeholder="Enter your username" />
        </Stack>
      )}
      <Stack>
        <Input
          type="email"
          label="Email"
          required
          placeholder="Enter your email"
        />
      </Stack>
      <Stack>
        <Input
          type="password"
          label="Password"
          required
          placeholder="Enter your password"
        />
      </Stack>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Stack direction="row" alignItems="center">
          <Checkbox color="primary" />
          <Typography variant="body2">Remember me</Typography>
        </Stack>
        <Link to="#">
          <Typography variant="body2">Forgot Password?</Typography>
        </Link>
      </Stack>
      <StyledButton fullWidth color="primary" variant="contained">
        {loginMode ? 'Login' : 'Signup'}
      </StyledButton>
      <StyledButton fullWidth color="inherit" variant="outlined">
        <Google sx={{ mr: 1 }} />
        {loginMode ? 'Login' : 'Signup'} with Google
      </StyledButton>
      <Stack direction="row" alignItems="center" spacing={1}>
        <Typography variant="body2">
          {loginMode ? "Don't have an account?" : 'Already have an account?'}{' '}
        </Typography>
        <Typography
          variant="body2"
          color="primary"
          sx={{ cursor: 'pointer' }}
          onClick={authSwitchHandler}>
          {loginMode ? 'Signup' : 'Login'}
        </Typography>
      </Stack>
    </Stack>
  );
};

export default AuthForm;
