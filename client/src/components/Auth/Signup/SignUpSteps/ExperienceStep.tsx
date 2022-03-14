import React from 'react';
import { useForm, FieldValues, Controller } from 'react-hook-form';
import { Stack, Typography } from '@mui/material';
import { StyledTextField, StyledButton } from './utils';

const ExperienceStep: React.FC<{
  onBack: () => void;
  onContinue: (formData: FieldValues) => void;
}> = (props) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = (formData: FieldValues) => {
    console.log(formData);
    // Continuing to the next step through props instead of continuing in the index.tsx component, because I wanted to do validation here before continuing.
    // Cool thing is that I can pass this data to the index.tsx component and gather all data from all the steps.
    props.onContinue(formData);
  };

  return (
    <Stack
      spacing={3}
      py={5}
      px={7}
      component="form"
      onSubmit={handleSubmit(onSubmit)}>
      <Typography variant="h4">Tell us about your experience</Typography>
      <Stack>
        <Typography variant="body2">Company name</Typography>
        <Controller
          name="companyName"
          control={control}
          defaultValue=""
          rules={{ required: 'Company name is required' }}
          render={({ field }) => (
            <StyledTextField
              {...field}
              error={Boolean(errors.companyName)}
              helperText={errors.companyName?.message}
            />
          )}
        />
      </Stack>
      <Stack>
        <Typography variant="body2">Professional role</Typography>
        <Controller
          name="professionalRole"
          control={control}
          defaultValue=""
          rules={{ required: 'Professional Role is Required' }}
          render={({ field }) => (
            <StyledTextField
              {...field}
              error={Boolean(errors.professionalRole)}
              helperText={errors.professionalRole?.message}
              placeholder="e.g. Software Engineer"
            />
          )}
        />
      </Stack>
      <Stack>
        <Typography variant="body2">Linkedin Profile</Typography>
        <Controller
          name="linkedinProfile"
          control={control}
          defaultValue=""
          rules={{ required: 'Linkedin Profile is Required' }}
          render={({ field }) => (
            <StyledTextField
              {...field}
              placeholder="https://www.linkedin.com/in/..."
              error={Boolean(errors.linkedinProfile)}
              helperText={errors.linkedinProfile?.message}
            />
          )}
        />
      </Stack>
      <Stack>
        <Typography variant="body2">Twitter Profile</Typography>
        <Controller
          name="twitterProfile"
          control={control}
          defaultValue=""
          rules={{ required: 'Twitter Profile is Required' }}
          render={({ field }) => (
            <StyledTextField
              {...field}
              error={Boolean(errors.twitterProfile)}
              helperText={errors.twitterProfile?.message}
              placeholder="https://www.twitter.com/..."
            />
          )}
        />
      </Stack>
      <Stack direction="row" justifyContent="space-between">
        <StyledButton onClick={props.onBack}>Back</StyledButton>
        <StyledButton type="submit" variant="contained" sx={{ flex: 0.5 }}>
          Continue
        </StyledButton>
      </Stack>
    </Stack>
  );
};

export default ExperienceStep;
