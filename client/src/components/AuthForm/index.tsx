import React, { useState } from 'react';
import axios from 'axios';
import useHttp from 'hooks/useHttp';
import { authState } from 'store';
import { useSetRecoilState } from 'recoil';
import { SERVER_URL } from 'config.keys';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useForm, Controller, FieldValues } from 'react-hook-form';
import { Link } from 'components/common';
import { styled } from '@mui/material/styles';
import {
  Avatar,
  Typography,
  Checkbox,
  Button,
  TextField,
  IconButton,
  FormControlLabel,
  Stack,
  LinearProgress,
} from '@mui/material';
import {
  Google,
  LinkedIn,
  Visibility,
  VisibilityOff,
} from '@mui/icons-material';

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
  const [params] = useSearchParams();
  const setAuthState = useSetRecoilState(authState);
  const [authMode, setAuthMode] = useState(
    params.get('page') === 'signup' ? AuthMode.signup : AuthMode.login,
  );
  const [showPassword, setShowPassword] = useState(false);
  const { loading, sendRequest, error: httpError } = useHttp();
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const authSwitchHandler = () => {
    setAuthMode(authMode === AuthMode.login ? AuthMode.signup : AuthMode.login);
  };

  const getPattern = (authMode: AuthMode, isMentor: any) => {
    if (!isMentor && authMode === AuthMode.signup)
      return {
        value: /^[A-Za-z0-9._%+-]+@thapar.edu$/i,
        message: 'Mentee must use thapar.edu mail',
      };

    return {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
      message: 'Invalid email address',
    };
  };

  const loginMode = authMode === AuthMode.login;

  const onSubmit = async (formData: FieldValues) => {
    if (authMode === AuthMode.login) {
      sendRequest(
        async () => {
          const { data } = await axios.post(
            `${SERVER_URL}/api/auth/login`,
            formData,
            {
              withCredentials: true,
            },
          );
          return data;
        },
        (data: any) => {
          setAuthState(data);
          if (data.emailId) {
            return navigate('/email-verification', {
              state: { email: formData.email },
            });
          }

          if (data.isLoggedIn && !data.user.signup_completed) {
            navigate('/registration-form');
          } else {
            navigate('/');
          }
        },
      );
    } else {
      sendRequest(
        async () => {
          const { data } = await axios.post(
            `${SERVER_URL}/api/auth/signup`,
            formData,
            {
              withCredentials: true,
            },
          );
          return data;
        },
        (data: any) => {
          setAuthState(data);
          navigate('/email-verification', { state: { email: formData.email } });
        },
      );
    }
  };

  const googleLogin = () => {
    window.location.href = `${SERVER_URL}/api/auth/google`;
  };

  const linkedInLogin = () => {
    window.location.href = `${SERVER_URL}/api/auth/linkedin`;
  };

  return (
    <Stack
      position="relative"
      spacing={3}
      py={5}
      px={7}
      component="form"
      onSubmit={handleSubmit(onSubmit)}>
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
      <Avatar src="/logo192.png" />
      <Stack>
        <Typography variant="h4">{loginMode ? 'Login' : 'Sign up'}</Typography>
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
              ...getPattern(authMode, watch('checkbox')),
            },
          }}
          render={({ field }) => (
            <StyledTextField
              {...field}
              type="email"
              placeholder="Enter your email"
              error={Boolean(errors.email) || Boolean(httpError?.email)}
              helperText={errors.email?.message || httpError?.email}
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
        {!loginMode && (
          <Stack direction="row" alignItems="center">
            <Controller
              name="checkbox"
              control={control}
              defaultValue={false}
              render={({ field }) => (
                <FormControlLabel
                  control={<Checkbox {...field} />}
                  label="Registering as a Mentor?"
                />
              )}
            />
            <Typography variant="body2"></Typography>
          </Stack>
        )}
        {loginMode && (
          <Link to="/reset-password">
            <Typography variant="body2" color="Highlight">
              Forgot Password?
            </Typography>
          </Link>
        )}
      </Stack>
      {typeof httpError === 'string' && (
        <Typography variant="body2" color="error">
          {httpError}
        </Typography>
      )}
      <StyledButton
        fullWidth
        color="primary"
        variant="contained"
        type="submit"
        disabled={loading}>
        {loginMode ? 'Login' : 'Signup'}
      </StyledButton>
      <StyledButton
        fullWidth
        color="inherit"
        variant="outlined"
        onClick={googleLogin}>
        <Google sx={{ mr: 1 }} />
        {loginMode ? 'Login' : 'Signup'} with Google
      </StyledButton>
      <StyledButton
        fullWidth
        color="inherit"
        variant="outlined"
        onClick={linkedInLogin}>
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
