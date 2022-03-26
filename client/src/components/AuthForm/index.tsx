import React, { useState } from 'react';
import { useForm, Controller, FieldValues } from 'react-hook-form';
import { Link } from 'components/common';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import {
  Avatar,
  Typography,
  Checkbox,
  Button,
  TextField,
  IconButton,
} from '@mui/material';
import {
  Google,
  LinkedIn,
  Visibility,
  VisibilityOff,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

enum AuthMode {
  login,
  signup,
}

const StyledButton = styled(Button)({
  fontWeight: 'bolder',
  borderRadius: '10px',
  textTransform: 'capitalize',
});

const StyledTextField = styled(TextField)({
  marginTop: '0.5rem',
  '& .MuiInputBase-root': {
    borderRadius: '16px',
    fontSize: '0.85rem',
  },
  '& :-webkit-autofill': {
    '-webkit-box-shadow': '0 0 0 100px #222222 inset !important',
    '-webkit-text-fill-color': '#fff',
    caretColor: '#fff',
    borderRadius: 'inherit',
  },
});

const AuthForm: React.FC = () => {
  const [authMode, setAuthMode] = useState(AuthMode.login);
  const [showPassword, setShowPassword] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const authSwitchHandler = () => {
    setAuthMode(authMode === AuthMode.login ? AuthMode.signup : AuthMode.login);
  };

  const loginMode = authMode === AuthMode.login;

  const onSubmit = (formData: FieldValues) => {
    console.log(formData);
    if (authMode === AuthMode.login) {
      // Send Request to /login
    } else {
      // only for demo purposes
      navigate('/registration-form');
      // Send Request to /signup
    }
  };

  return (
    <Stack
      spacing={3}
      py={5}
      px={7}
      component="form"
      onSubmit={handleSubmit(onSubmit)}>
      <Avatar src="/logo192.png" />
      <Stack>
        <Typography variant="h4">Welcome Back</Typography>
        <Typography variant="body1" color="textSecondary">
          Please enter your details here to continue...
        </Typography>
      </Stack>
      <Stack>
        <Typography variant="body2">Email</Typography>
        <Controller
          control={control}
          name="email"
          defaultValue=""
          rules={{
            required: 'Email is required',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
              message: 'Invalid email address',
            },
          }}
          render={({ field }) => (
            <StyledTextField
              {...field}
              type="email"
              placeholder="Enter your email"
              error={Boolean(errors.email)}
              helperText={errors.email && errors.email.message}
            />
          )}
        />
      </Stack>
      <Stack>
        <Typography variant="body2">Password</Typography>
        <Controller
          control={control}
          name="password"
          defaultValue=""
          rules={{
            required: 'Password is required',
            minLength: {
              value: 6,
              message: 'Password must be at least 6 characters',
            },
          }}
          render={({ field }) => (
            <StyledTextField
              {...field}
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter your password"
              error={Boolean(errors.password)}
              helperText={errors.password && errors.password.message}
              InputProps={{
                endAdornment: (
                  <IconButton onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                ),
              }}
            />
          )}
        />
      </Stack>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Stack direction="row" alignItems="center">
          <Checkbox color="primary" />
          <Typography variant="body2">Remember me</Typography>
        </Stack>
        {loginMode && (
          <Link to="#">
            <Typography variant="body2">Forgot Password?</Typography>
          </Link>
        )}
      </Stack>
      <StyledButton fullWidth color="primary" variant="contained" type="submit">
        {loginMode ? 'Login' : 'Signup'}
      </StyledButton>
      <StyledButton fullWidth color="inherit" variant="outlined">
        <Google sx={{ mr: 1 }} />
        {loginMode ? 'Login' : 'Signup'} with Google
      </StyledButton>
      <StyledButton fullWidth color="inherit" variant="outlined">
        <LinkedIn sx={{ mr: 1 }} />
        {loginMode ? 'Login' : 'Signup'} with LinkedIn
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
