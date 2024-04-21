import React from 'react';
import Appbar from 'components/Appbar';
import { Stack, Typography, TextField, Button, styled } from '@mui/material';
import { useMutation } from 'react-query';
import { useForm, Controller, FieldValues } from 'react-hook-form';
import { APP_NAME, SERVER_URL } from 'config.keys';
import axios, { AxiosError } from 'axios';
import { toast } from 'react-toastify';

interface FormData {
  name: string;
  email: string;
}

const StyledButton = styled(Button)`
  background-size: 200%;
  font-weight: 700;
  color: #f5f5f5;
  font-size: 1rem;
  background-image: linear-gradient(90deg, #3512b2, #d18873);
  box-shadow:
    0 2px 1px transparent,
    0 4px 2px transparent,
    0 8px 4px transparent,
    0 16px 8px transparent,
    0 32px 16px transparent;
  transition: all 0.8s cubic-bezier(0.32, 1.32, 0.42, 0.68);

  /* transition: all 0.8s cubic-bezier(0.32, 1.32, 0.42, 0.68); */
  :hover {
    transform: scale(1.05);
    /* transform: linear-gradient(230deg, #35249b, #8b13c3 50%, #ea577a); */
  }
`;

const joinWaitlist = async (formData: FormData) => {
  const { data } = await axios.post(
    `${SERVER_URL}/api/join-waitlist`,
    formData,
  );

  return data;
};

const WaitListPage = () => {
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm();
  const mutation = useMutation(
    'join-waitlist',
    (formData: FormData) => joinWaitlist(formData),
    {
      onSuccess: () => {
        toast.success('You have been added to the waitlist');
      },
      onError: (err: AxiosError) => {
        toast.error(err.response?.data.error);
      },
    },
  );

  const onSubmit = (formData: FieldValues) => {
    const data = formData as FormData;
    mutation.mutate(data);
  };

  return (
    <>
      <Appbar />
      <Stack
        color="#fff"
        spacing={5}
        my={2}
        alignItems="center"
        maxWidth="sm"
        mx="auto"
        sx={{ p: { xs: '2rem', sm: '1rem', md: '0rem' } }}>
        <Stack spacing={2} textAlign="center">
          <Typography variant="body2" color="textSecondary">
            A platform for getting mentorship
          </Typography>
          <Typography variant="h4" sx={{ fontWeight: 700 }}>
            Get mentorship <br /> with {APP_NAME}
          </Typography>
          <Typography variant="body1" color="textSecondary">
            This platform is a mentorship platform for students who are looking
            for quality mentorship. It makes it easy for you to find your
            perfect mentor. You can search through hundreds of quality mentors
            and book a session with any of them.
          </Typography>
        </Stack>
        <Stack component="form" spacing={2} onSubmit={handleSubmit(onSubmit)}>
          <Typography variant="subtitle2" fontStyle={'italic'} fontWeight={700}>
            Join Hundreds of Students Looking for Quality Mentorship
          </Typography>
          <Stack spacing={1}>
            <Controller
              control={control}
              name="name"
              defaultValue=""
              rules={{ required: 'Your Name is required' }}
              render={({ field }) => (
                <TextField
                  {...field}
                  sx={{ flex: 1 }}
                  label="Enter your Name"
                  error={Boolean(errors.name)}
                  helperText={errors.name && errors.name.message}
                />
              )}
            />
            <Controller
              control={control}
              name="email"
              defaultValue=""
              rules={{
                required: 'Email is required',
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  sx={{ flex: 1 }}
                  type="email"
                  label="Enter your email"
                  error={Boolean(errors.email)}
                  helperText={errors.email && errors.email.message}
                />
              )}
            />
          </Stack>
          <StyledButton
            type="submit"
            variant="contained"
            color="primary"
            disabled={mutation.isLoading}>
            {mutation.isLoading ? 'Adding you to Waitlist' : 'Join Waitlist'}
          </StyledButton>
        </Stack>
      </Stack>
    </>
  );
};

export default WaitListPage;
