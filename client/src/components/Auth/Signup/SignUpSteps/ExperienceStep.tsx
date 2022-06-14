import React, { useState, useEffect } from 'react';
import { useForm, FieldValues, Controller } from 'react-hook-form';
import { Stack, Typography, IconButton } from '@mui/material';
import { Add } from '@mui/icons-material';
import {
  StyledTextField,
  StyledButton,
  StyledReactSelect as Select,
} from './utils';
import {
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
  const [experiences, setExperiences] = useState([0]);
  const {
    handleSubmit,
    control,
    formState: { errors },
    getValues,
  } = useForm(props.hydrate);

  const onSubmit = (formData: FieldValues) => {
    // Continuing to the next step through props instead of continuing in the index.tsx component, because I wanted to do validation here before continuing.
    // Cool thing is that I can pass this data to the index.tsx component and gather all data from all the steps.
    props.onContinue(1, { ...formData, experiencesArray: experiences });
  };

  const onBack = () => {
    props.onBack(1, getValues());
  };

  useEffect(() => {
    if (props.hydrate?.experiencesArray) {
      setExperiences(props.hydrate.experiencesArray);
    }
  }, [props.hydrate?.experiencesArray]);

  return (
    <Stack
      spacing={3}
      mt={2}
      position="relative"
      component="form"
      onSubmit={handleSubmit(onSubmit)}>
      <Typography variant="h4">Experience</Typography>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="h6">
          Tell us about your previous experience.
        </Typography>
        <IconButton
          onClick={() => setExperiences([...experiences, experiences.length])}>
          <Add />
        </IconButton>
      </Stack>
      {experiences.map((i) => (
        <Stack direction={{ xs: 'column', md: 'row' }} key={i} spacing={1}>
          <Stack flexGrow={1}>
            <Typography variant="body2">Company name</Typography>
            <Controller
              name={`experiences.${i}.companyName`}
              control={control}
              defaultValue={props.hydrate?.experiences?.[i]?.companyName || ''}
              rules={{ required: 'Company name is required' }}
              render={({ field }) => (
                <StyledTextField
                  {...field}
                  placeholder="Company name"
                  error={Boolean(errors.experiences?.[i]?.companyName)}
                  helperText={errors.experiences?.[i]?.companyName?.message}
                />
              )}
            />
          </Stack>
          <Stack flexGrow={1}>
            <Typography variant="body2">Professional role</Typography>
            <Controller
              name={`experiences.${i}.role`}
              control={control}
              defaultValue={props.hydrate?.experiences?.[i]?.role || ''}
              rules={{ required: 'Professional Role is Required' }}
              render={({ field }) => (
                <StyledTextField
                  {...field}
                  error={Boolean(errors.experiences?.[i]?.role)}
                  helperText={errors.experiences?.[i]?.role?.message}
                  placeholder="e.g. Software Engineer"
                />
              )}
            />
          </Stack>
          <Stack flexGrow={1}>
            <Typography variant="body2">Start Year</Typography>
            <Controller
              name={`experiences.${i}.startYear`}
              control={control}
              defaultValue={props.hydrate?.experiences?.[i]?.startYear || ''}
              rules={{
                required: 'Start Year is Required',
                validate: (val) => {
                  if (isNaN(parseInt(val, 10))) return 'Start Year is Invalid';

                  if (
                    parseInt(val, 10) >
                    parseInt(getValues().experiences?.[i]?.endYear, 10)
                  ) {
                    return 'Start year is invalid';
                  }

                  return true;
                },
              }}
              render={({ field }) => (
                <StyledTextField
                  {...field}
                  error={Boolean(errors.experiences?.[i]?.startYear)}
                  helperText={errors.experiences?.[i]?.startYear?.message}
                  placeholder="e.g. 2018"
                />
              )}
            />
          </Stack>
          <Stack flexGrow={1}>
            <Typography variant="body2">End Year</Typography>
            <Controller
              name={`experiences.${i}.endYear`}
              control={control}
              defaultValue={props.hydrate?.experiences?.[i]?.endYear || ''}
              rules={{
                required: 'End Year is required',
                validate: (val) => {
                  if (val.toLowerCase() === 'present') {
                    return true;
                  }

                  if (isNaN(parseInt(val, 10))) {
                    return 'End Year is Invalid';
                  }

                  if (
                    parseInt(val, 10) <
                    parseInt(getValues().experiences?.[i]?.startYear, 10)
                  ) {
                    return 'End Year is Invalid';
                  }

                  return true;
                },
              }}
              render={({ field }) => (
                <StyledTextField
                  {...field}
                  error={Boolean(errors.experiences?.[i]?.endYear)}
                  helperText={errors.experiences?.[i]?.endYear?.message}
                  placeholder="e.g. Present"
                />
              )}
            />
          </Stack>
        </Stack>
      ))}
      <Typography variant="h6">Profiles</Typography>
      <Stack>
        <Typography variant="body2">Linkedin Profile</Typography>
        <Controller
          name="linkedinProfile"
          control={control}
          defaultValue={props.hydrate?.linkedinProfile || ''}
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
