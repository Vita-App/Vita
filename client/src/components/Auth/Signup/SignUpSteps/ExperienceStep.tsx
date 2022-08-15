import React, { useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';
import { useForm, FieldValues, Controller } from 'react-hook-form';
import { Stack, Typography, IconButton } from '@mui/material';
import { Add, Delete } from '@mui/icons-material';
import {
  StyledTextField,
  MuiStyledButton as StyledButton,
  MultiSelectElement,
} from 'components/common';
import { getTopicOptions, expertiseOptions } from 'data';
import { ExperienceType } from 'types';

const ExperienceStep: React.FC<{
  onBack: (step: number, formData: FieldValues) => void;
  onContinue: (step: number, formData: FieldValues) => void;
  hydrate?: FieldValues;
}> = (props) => {
  const [topicsError, setTopicsError] = useState(false);
  const [experiences, setExperiences] = useState<ExperienceType[]>(
    props.hydrate?.experiences || [
      {
        _id: uuid(),
        company: '',
        role: '',
      },
    ],
  );

  const {
    handleSubmit,
    control,
    formState: { errors },
    getValues,
  } = useForm();

  const onSubmit = (formData: FieldValues) => {
    const topics = getValues('topics');

    const hasOneTopic = Object.keys(topics).some(
      (topic) => topics[topic].length,
    );

    if (!hasOneTopic) {
      setTopicsError(true);
      return;
    }

    props.onContinue(1, { ...formData, experiences });
  };

  const onBack = () => {
    props.onBack(1, { ...getValues(), experiences });
  };

  const onExperienceChange = (id: string, exp: Partial<ExperienceType>) => {
    const experience = experiences.map((e) => {
      if (e._id === id) {
        return { ...e, ...exp };
      }

      return e;
    });
    setExperiences(experience);
  };

  useEffect(() => {
    setTopicsError(false);
  }, []);

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
          Tell us about your previous experiences.
        </Typography>
        <IconButton
          onClick={() =>
            setExperiences((prev) => [
              ...prev,
              {
                _id: uuid(),
                company: '',
                role: '',
              },
            ])
          }>
          <Add />
        </IconButton>
      </Stack>
      {experiences.map((exp) => (
        <Stack spacing={1} key={exp._id}>
          {experiences.length > 1 && (
            <IconButton
              color="error"
              sx={{ alignSelf: 'flex-start' }}
              onClick={() => {
                setExperiences((prevExp) =>
                  prevExp.filter((e) => e._id !== exp._id),
                );
              }}>
              <Delete />
            </IconButton>
          )}
          <Stack direction={{ xs: 'column', md: 'row' }} spacing={1}>
            <Stack flexGrow={1}>
              <Typography variant="body2">Company name</Typography>
              <Controller
                name={`experience[${exp._id}].company`}
                control={control}
                defaultValue={exp.company || ''}
                rules={{ required: 'Company name is required' }}
                render={({ field: { onChange, ...other } }) => (
                  <StyledTextField
                    {...other}
                    onChange={(e) => {
                      onChange(e);
                      onExperienceChange(exp._id, { company: e.target.value });
                    }}
                    placeholder="Company name"
                    error={Boolean(errors.experience?.[exp._id]?.company)}
                    helperText={errors.experience?.[exp._id]?.company?.message}
                  />
                )}
              />
            </Stack>
            <Stack flexGrow={1}>
              <Typography variant="body2">Professional role</Typography>
              <Controller
                name={`experience[${exp._id}].role`}
                control={control}
                defaultValue={exp.role || ''}
                rules={{ required: 'Professional Role is Required' }}
                render={({ field: { onChange, ...other } }) => (
                  <StyledTextField
                    {...other}
                    onChange={(e) => {
                      onChange(e);
                      onExperienceChange(exp._id, { role: e.target.value });
                    }}
                    error={Boolean(errors.experience?.[exp._id]?.role)}
                    helperText={errors.experience?.[exp._id]?.role?.message}
                    placeholder="e.g. Software Engineer"
                  />
                )}
              />
            </Stack>
            <Stack flexGrow={1}>
              <Typography variant="body2">Start Year</Typography>
              <Controller
                name={`experience[${exp._id}].start_year`}
                control={control}
                defaultValue={exp.start_year || ''}
                rules={{
                  required: 'Start Year is Required',
                  validate: (val) => {
                    if (isNaN(parseInt(val, 10)))
                      return 'Start Year is Invalid';

                    if (
                      parseInt(val, 10) >
                      parseInt(getValues().experience[exp._id]?.end_year, 10)
                    ) {
                      return 'Start year is invalid';
                    }

                    return true;
                  },
                }}
                render={({ field: { onChange, ...other } }) => (
                  <StyledTextField
                    {...other}
                    onChange={(e) => {
                      onChange(e);
                      onExperienceChange(exp._id, {
                        start_year: e.target.value,
                      });
                    }}
                    error={Boolean(errors.experience?.[exp._id]?.start_year)}
                    helperText={
                      errors.experience?.[exp._id]?.start_year?.message
                    }
                    placeholder="e.g. 2018"
                  />
                )}
              />
            </Stack>
            <Stack flexGrow={1} position="relative">
              <Typography variant="body2">End Year</Typography>
              <Controller
                name={`experience[${exp._id}].end_year`}
                control={control}
                defaultValue={exp.end_year || ''}
                rules={{
                  required: 'End Year is required',
                  validate: (_val: string) => {
                    const val = _val.trim();

                    if (val.toLowerCase() === 'present') {
                      return true;
                    }

                    if (isNaN(parseInt(val, 10))) {
                      return 'End Year is Invalid';
                    }

                    if (
                      parseInt(val, 10) <
                      parseInt(getValues().experience[exp._id]?.start_year, 10)
                    ) {
                      return 'End Year is Invalid';
                    }

                    return true;
                  },
                }}
                render={({ field: { onChange, ...other } }) => (
                  <StyledTextField
                    {...other}
                    onChange={(e) => {
                      onChange(e);
                      onExperienceChange(exp._id, { end_year: e.target.value });
                    }}
                    error={Boolean(errors.experience?.[exp._id]?.end_year)}
                    helperText={errors.experience?.[exp._id]?.end_year?.message}
                    placeholder="e.g. Present"
                  />
                )}
              />
            </Stack>
          </Stack>
        </Stack>
      ))}
      <Stack>
        <Typography variant="h5" gutterBottom>
          Profiles
        </Typography>
        <Typography variant="body2">Linkedin Profile*</Typography>
        <Controller
          name="linkedin"
          control={control}
          defaultValue={props.hydrate?.linkedin || ''}
          rules={{
            required: 'Linkedin Profile is required',
          }}
          render={({ field }) => (
            <StyledTextField
              {...field}
              placeholder="https://www.linkedin.com/in/..."
              error={Boolean(errors.linkedin)}
              helperText={errors.linkedin?.message}
            />
          )}
        />
      </Stack>
      <Stack>
        <Typography variant="body2">Twitter Profile</Typography>
        <Controller
          name="twitter"
          control={control}
          defaultValue={props.hydrate?.twitter || ''}
          render={({ field }) => (
            <StyledTextField
              {...field}
              error={Boolean(errors.twitter)}
              helperText={errors.twitter?.message}
              placeholder="https://www.twitter.com/..."
            />
          )}
        />
      </Stack>
      <Stack spacing={2}>
        <Typography variant="body2">What&apos;s your expertise ?</Typography>
        <MultiSelectElement
          multiple
          control={control}
          menuItems={expertiseOptions}
          name="expertise[]"
          defaultValue={props.hydrate?.expertise || []}
          showChips
          validation={{
            required: 'Please select at least one expertise',
          }}
          label="Expertise"
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
        <Stack mt={2} spacing={2}>
          <MultiSelectElement
            multiple
            control={control}
            name="topics[jobSearch]"
            defaultValue={props.hydrate?.topics?.jobSearch || []}
            menuItems={getTopicOptions('Job Search')}
            showChips
            label="Job Search"
          />
          <MultiSelectElement
            multiple
            control={control}
            name="topics[career]"
            defaultValue={props.hydrate?.topics?.career || []}
            menuItems={getTopicOptions('Career Advice')}
            showChips
            label="Career Advice"
          />
          <MultiSelectElement
            multiple
            control={control}
            name="topics[leaderShip]"
            defaultValue={props.hydrate?.topics?.leaderShip || []}
            menuItems={getTopicOptions('Leadership')}
            showChips
            label="Leadership"
          />
          <MultiSelectElement
            multiple
            control={control}
            name="topics[skills]"
            defaultValue={props.hydrate?.topics?.skills || []}
            menuItems={getTopicOptions('Skills')}
            showChips
            label="Skills"
          />
        </Stack>
        {topicsError && (
          <Typography variant="body2" color="error" sx={{ mt: 2 }}>
            Please select at least 1 topic to mentor on.
          </Typography>
        )}
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
