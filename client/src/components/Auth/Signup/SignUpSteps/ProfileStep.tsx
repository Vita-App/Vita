import React, { useEffect, useRef, useState } from 'react';
import { useForm, FieldValues, Controller } from 'react-hook-form';
import { Stack, Typography, Avatar, Chip } from '@mui/material';
import { interestOptions, streamOptions } from 'data';
import {
  StyledTextField,
  StyledButton,
  StyledReactSelect as Select,
} from './utils';

const ProfileStep: React.FC<{
  onContinue: (step: number, formData: FieldValues) => void;
  hydrate?: FieldValues;
  interests: string[];
  setInterests: (interests: string[]) => void;
}> = (props) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm(props.hydrate);

  const [avatarSrc, setAvatarSrc] = useState('');
  const profilePicRef = useRef<HTMLInputElement>();

  const onSubmit = (data: FieldValues) => {
    // Continuing to the next step through props instead of continuing in the index.tsx component, because I wanted to do validation here before continuing.
    // Cool thing is that I can pass this data to the index.tsx component and gather all data from all the steps.
    let file;
    if (
      profilePicRef.current!.files &&
      profilePicRef.current!.files.length > 0
    ) {
      file = profilePicRef.current!.files[0];
    } else if (avatarSrc) {
      file = props.hydrate?.profilePicture;
    }

    props.onContinue(0, { ...data, profilePicture: file });
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();

    if (!e.target.files || e.target.files.length === 0) return;

    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      setAvatarSrc(reader.result as string);
    };
  };

  const onRemove = () => {
    setAvatarSrc('');
    profilePicRef.current!.files = null;
  };

  useEffect(() => {
    if (props.hydrate && props.hydrate.profilePicture) {
      const reader = new FileReader();

      reader.readAsDataURL(props.hydrate.profilePicture);
      reader.onload = () => {
        setAvatarSrc(reader.result as string);
      };
    }
  }, []);

  const minGraduationYear = 1975;
  const maxGraduationYear = new Date().getFullYear() + 5;

  return (
    <Stack
      spacing={3}
      mt={2}
      component="form"
      onSubmit={handleSubmit(onSubmit)}>
      <Typography variant="h4">Tell us about yourself</Typography>
      <Stack>
        <Typography variant="body2" mb={1}>
          Profile Picture
        </Typography>
        <Stack
          direction="row"
          spacing={3}
          border={1}
          p={2}
          borderRadius="4px"
          borderColor="#767676"
          alignItems="center">
          <Avatar sx={{ width: '50px', height: '50px' }} src={avatarSrc} />
          <Stack spacing={1}>
            <Stack direction="row" spacing={1}>
              <StyledButton
                variant="contained"
                sx={{ flex: 0.4 }}
                onClick={() => profilePicRef.current?.click()}>
                Upload
              </StyledButton>
              <StyledTextField
                id="profilePicture"
                type="file"
                inputRef={profilePicRef}
                onChange={onChange}
                sx={{
                  display: 'none',
                }}
                inputProps={{
                  accept: 'image/jpeg, image/png',
                }}
              />
              <StyledButton
                variant="outlined"
                sx={{ flex: 0.2 }}
                onClick={onRemove}>
                Remove
              </StyledButton>
            </Stack>
            <Typography variant="caption" color="textSecondary">
              You can upload .jpeg or .png image files.
            </Typography>
          </Stack>
        </Stack>
      </Stack>
      <Stack direction="row" spacing={1}>
        <Stack flexGrow={1}>
          <Typography variant="body2">First Name</Typography>
          <Controller
            name="first_name"
            control={control}
            defaultValue={props.hydrate?.first_name || ''}
            rules={{ required: 'First name is required' }}
            render={({ field }) => (
              <StyledTextField
                {...field}
                error={Boolean(errors.first_name)}
                helperText={errors.first_name?.message}
                placeholder="Enter your first name"
              />
            )}
          />
        </Stack>
        <Stack flexGrow={1}>
          <Typography variant="body2">Last Name</Typography>
          <Controller
            name="last_name"
            control={control}
            defaultValue={props.hydrate?.last_name || ''}
            render={({ field }) => (
              <StyledTextField {...field} placeholder="Enter your last name" />
            )}
          />
        </Stack>
      </Stack>
      <Stack flexGrow={1}>
        <Typography variant="body2">Email</Typography>
        <Controller
          name="email"
          control={control}
          defaultValue={props.hydrate?.email || ''}
          rules={{ required: 'Email is Required' }}
          render={({ field }) => (
            <StyledTextField
              {...field}
              error={Boolean(errors.email)}
              helperText={errors.email?.message}
              placeholder="Enter your email"
            />
          )}
        />
      </Stack>
      <Stack>
        <Typography variant="body2">Bio</Typography>
        <Controller
          name="bio"
          control={control}
          defaultValue={props.hydrate?.bio || ''}
          render={({ field }) => (
            <StyledTextField
              {...field}
              placeholder="Enter your bio"
              multiline
              minRows={3}
            />
          )}
        />
      </Stack>
      <Stack direction="row" spacing={1}>
        <Stack flexGrow={1}>
          <Typography variant="body2">Phone</Typography>
          <Controller
            name="phone"
            control={control}
            defaultValue={props.hydrate?.phone || ''}
            rules={{
              required: 'Phone Number is Required',
              pattern: {
                value: /^(\+\d{1,3}[- ]?)?\d{10}$/,
                message: 'Invalid Phone Number',
              },
            }}
            render={({ field }) => (
              <StyledTextField
                {...field}
                error={Boolean(errors.phone)}
                helperText={errors.phone?.message}
                placeholder="Enter a phone number"
              />
            )}
          />
        </Stack>
        <Stack flexGrow={1}>
          <Typography variant="body2">Graduation year</Typography>
          <Controller
            name="graduationYear"
            control={control}
            defaultValue={props.hydrate?.graduationYear || ''}
            rules={{
              required: 'Graduation Year is Required',
              pattern: { value: /^[0-9]{4}$/, message: 'Invalid Year' },
              min: { value: minGraduationYear, message: 'Invalid Year' },
              max: { value: maxGraduationYear, message: 'Invalid Year' },
            }}
            render={({ field }) => (
              <StyledTextField
                {...field}
                error={Boolean(errors.graduationYear)}
                helperText={errors.graduationYear?.message}
                placeholder="Enter your graduation year"
              />
            )}
          />
        </Stack>
      </Stack>
      <Stack flexGrow={1}>
        <Typography variant="body2" gutterBottom>
          Stream
        </Typography>
        <Controller
          name="stream"
          control={control}
          defaultValue={props.hydrate?.stream || ''}
          rules={{
            required: 'Stream is Required',
          }}
          render={({ field }) => (
            <Select
              {...field}
              placeholder="Choose your course"
              classNamePrefix="select"
              options={streamOptions}
            />
          )}
        />
      </Stack>
      <Stack>
        <Typography variant="h6" mb={1}>
          Tell us about your interest
        </Typography>
        <Stack direction="row" flexWrap="wrap">
          {interestOptions.map((option) => (
            <Chip
              key={option.value}
              label={option.label}
              sx={{ m: 1 }}
              onClick={() => {
                if (props.interests.includes(option.value)) {
                  const newInterests = props.interests.filter(
                    (interest) => interest !== option.value,
                  );

                  props.setInterests(newInterests);
                } else {
                  props.setInterests([...props.interests, option.value]);
                }
              }}
              color={
                props.interests.includes(option.value) ? 'primary' : 'default'
              }
            />
          ))}
        </Stack>
      </Stack>
      <Stack>
        <Typography variant="body2">Referal code (if any)</Typography>
        <Controller
          name="referalCode"
          control={control}
          defaultValue={props.hydrate?.referalCode || ''}
          render={({ field }) => (
            <StyledTextField {...field} placeholder="Enter your referal code" />
          )}
        />
      </Stack>
      <Stack direction="row" justifyContent="center">
        <StyledButton type="submit" variant="contained" sx={{ flex: 0.5 }}>
          Continue
        </StyledButton>
      </Stack>
    </Stack>
  );
};

export default ProfileStep;
