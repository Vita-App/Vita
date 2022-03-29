import React from 'react';
import { useForm, FieldValues, Controller } from 'react-hook-form';
import { Stack, Typography } from '@mui/material';
import {
  StyledTextField,
  StyledButton,
  StyledReactSelect as Select,
} from './utils';
import {
  companyOptions,
  leadershipOptions,
  careerOptions,
  jobSearchOptions,
  skillOptions,
} from 'data';

const ExperienceStep: React.FC<{
  onBack: (step: number, formData: FieldValues) => void;
  onContinue: (step: number, formData: FieldValues) => void;
  hydrate?: FieldValues;
}> = (props) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    getValues,
  } = useForm(props.hydrate);

  const onSubmit = (formData: FieldValues) => {
    // Continuing to the next step through props instead of continuing in the index.tsx component, because I wanted to do validation here before continuing.
    // Cool thing is that I can pass this data to the index.tsx component and gather all data from all the steps.
    props.onContinue(1, formData);
  };

  const onBack = () => {
    props.onBack(1, getValues());
  };

  return (
    <Stack
      spacing={3}
      mt={2}
      component="form"
      onSubmit={handleSubmit(onSubmit)}>
      <Typography variant="h4">Tell us about your experience</Typography>
      <Stack>
        <Typography variant="body2" mb={1}>
          Company name
        </Typography>
        <Controller
          name="companyName"
          control={control}
          defaultValue={props.hydrate?.companyName || ''}
          rules={{ required: 'Company name is required' }}
          render={({ field }) => (
            <Select
              {...field}
              options={companyOptions}
              classNamePrefix="select"
            />
          )}
        />
      </Stack>
      <Stack>
        <Typography variant="body2">Professional role</Typography>
        <Controller
          name="professionalRole"
          control={control}
          defaultValue={props.hydrate?.professionalRole || ''}
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
          defaultValue={props.hydrate?.linkedinProfile || ''}
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
          defaultValue={props.hydrate?.twitterProfile || ''}
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
      <Stack>
        <Typography variant="h6">
          Select Topics {"you'd"} like to mentor on.
        </Typography>
        <Typography variant="body2" color="textSecondary">
          We recommend selecting at least 5 topic areas to explore what
          interests you.
        </Typography>
        <Stack mt={1} spacing={2}>
          <Controller
            name="topics[leaderShip]"
            control={control}
            defaultValue={props.hydrate?.topics?.leaderShip || []}
            render={({ field }) => (
              <Select
                {...field}
                placeholder="Leadership"
                isMulti
                classNamePrefix="select"
                options={leadershipOptions}
              />
            )}
          />
          <Controller
            name="topics[career]"
            control={control}
            defaultValue={props.hydrate?.topics?.career || []}
            render={({ field }) => (
              <Select
                {...field}
                placeholder="Career"
                isMulti
                classNamePrefix="select"
                options={careerOptions}
              />
            )}
          />
          <Controller
            name="topics[jobSearch]"
            control={control}
            defaultValue={props.hydrate?.topics?.jobSearch || []}
            render={({ field }) => (
              <Select
                {...field}
                placeholder="Job Search"
                isMulti
                classNamePrefix="select"
                options={jobSearchOptions}
              />
            )}
          />
          <Controller
            name="topics[skills]"
            control={control}
            defaultValue={props.hydrate?.topics?.skills || []}
            render={({ field }) => (
              <Select
                {...field}
                placeholder="Skills"
                isMulti
                classNamePrefix="select"
                options={skillOptions}
              />
            )}
          />
        </Stack>
      </Stack>
      <Stack direction="row" justifyContent="space-between">
        <StyledButton onClick={onBack}>Back</StyledButton>
        <StyledButton type="submit" variant="contained" sx={{ flex: 0.5 }}>
          Continue
        </StyledButton>
      </Stack>
    </Stack>
  );
};

export default ExperienceStep;
