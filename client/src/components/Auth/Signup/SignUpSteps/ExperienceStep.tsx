import React, { useState } from 'react';
import { v4 as uuid } from 'uuid';
import { useForm, FieldValues, Controller } from 'react-hook-form';
import { Stack, Typography, IconButton } from '@mui/material';
import { Add, Delete } from '@mui/icons-material';
import {
  StyledTextField,
  MuiStyledButton as StyledButton,
  StyledReactSelect as Select,
} from 'components/common';
import { LanguageOptions, getTopicOptions, expertiseOptions } from 'data';
import { ExperienceType } from 'types';

const ExperienceStep: React.FC<{
  onBack: (step: number, formData: FieldValues) => void;
  onContinue: (step: number, formData: FieldValues) => void;
  hydrate?: FieldValues;
}> = (props) => {
  const [experiences, setExperiences] = useState<ExperienceType[]>(
    props.hydrate?.experiences || [
      {
        id: uuid(),
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
    props.onContinue(1, { ...formData, experiences });
  };

  const onBack = () => {
    props.onBack(1, { ...getValues(), experiences });
  };

  const onExperienceChange = (id: string, exp: Partial<ExperienceType>) => {
    const experience = experiences.map((e) => {
      if (e.id === id) {
        return { ...e, ...exp };
      }

      return e;
    });
    setExperiences(experience);
  };

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
                id: uuid(),
                company: '',
                role: '',
              },
            ])
          }>
          <Add />
        </IconButton>
      </Stack>
      {experiences.map((exp) => (
        <Stack spacing={1} key={exp.id}>
          {experiences.length > 1 && (
            <IconButton
              color="error"
              sx={{ alignSelf: 'flex-start' }}
              onClick={() => {
                setExperiences((prevExp) =>
                  prevExp.filter((e) => e.id !== exp.id),
                );
              }}>
              <Delete />
            </IconButton>
          )}
          <Stack direction={{ xs: 'column', md: 'row' }} spacing={1}>
            <Stack flexGrow={1}>
              <Typography variant="body2">Company name</Typography>
              <Controller
                name={`experience[${exp.id}].company`}
                control={control}
                defaultValue={exp.company || ''}
                rules={{ required: 'Company name is required' }}
                render={({ field: { onChange, ...other } }) => (
                  <StyledTextField
                    {...other}
                    onChange={(e) => {
                      onChange(e);
                      onExperienceChange(exp.id, { company: e.target.value });
                    }}
                    placeholder="Company name"
                    error={Boolean(errors.experience?.[exp.id]?.company)}
                    helperText={errors.experience?.[exp.id]?.company?.message}
                  />
                )}
              />
            </Stack>
            <Stack flexGrow={1}>
              <Typography variant="body2">Professional role</Typography>
              <Controller
                name={`experience[${exp.id}].role`}
                control={control}
                defaultValue={exp.role || ''}
                rules={{ required: 'Professional Role is Required' }}
                render={({ field: { onChange, ...other } }) => (
                  <StyledTextField
                    {...other}
                    onChange={(e) => {
                      onChange(e);
                      onExperienceChange(exp.id, { role: e.target.value });
                    }}
                    error={Boolean(errors.experience?.[exp.id]?.role)}
                    helperText={errors.experience?.[exp.id]?.role?.message}
                    placeholder="e.g. Software Engineer"
                  />
                )}
              />
            </Stack>
            <Stack flexGrow={1}>
              <Typography variant="body2">Start Year</Typography>
              <Controller
                name={`experience[${exp.id}].start_year`}
                control={control}
                defaultValue={exp.start_year || ''}
                rules={{
                  required: 'Start Year is Required',
                  validate: (val) => {
                    if (isNaN(parseInt(val, 10)))
                      return 'Start Year is Invalid';

                    if (
                      parseInt(val, 10) >
                      parseInt(getValues().experience[exp.id]?.end_year, 10)
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
                      onExperienceChange(exp.id, {
                        start_year: e.target.value,
                      });
                    }}
                    error={Boolean(errors.experience?.[exp.id]?.start_year)}
                    helperText={
                      errors.experience?.[exp.id]?.start_year?.message
                    }
                    placeholder="e.g. 2018"
                  />
                )}
              />
            </Stack>
            <Stack flexGrow={1} position="relative">
              <Typography variant="body2">End Year</Typography>
              <Controller
                name={`experience[${exp.id}].end_year`}
                control={control}
                defaultValue={exp.end_year || ''}
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
                      parseInt(getValues().experience[exp.id]?.start_year, 10)
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
                      onExperienceChange(exp.id, { end_year: e.target.value });
                    }}
                    error={Boolean(errors.experience?.[exp.id]?.end_year)}
                    helperText={errors.experience?.[exp.id]?.end_year?.message}
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
        <Typography variant="body2">Linkedin Profile</Typography>
        <Controller
          name="linkedin"
          control={control}
          defaultValue={props.hydrate?.linkedin || ''}
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
      <Stack spacing={1}>
        <Typography variant="body2">Languages you are efficient in</Typography>
        <Controller
          name="languages[]"
          control={control}
          defaultValue={props.hydrate?.languages || []}
          render={({ field }) => (
            <Select
              closeMenuOnSelect={false}
              {...field}
              placeholder="Languages"
              isMulti
              classNamePrefix="select"
              options={LanguageOptions}
            />
          )}
        />
      </Stack>
      <Stack spacing={1}>
        <Typography variant="body2">What&apos;s your expertise ?</Typography>
        <Controller
          name="expertise[]"
          control={control}
          defaultValue={props.hydrate?.expertise || []}
          render={({ field }) => (
            <Select
              closeMenuOnSelect={false}
              {...field}
              placeholder="Expertise"
              isMulti
              classNamePrefix="select"
              options={expertiseOptions}
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
                closeMenuOnSelect={false}
                {...field}
                menuPlacement="top"
                placeholder="Leadership"
                isMulti
                classNamePrefix="select"
                options={getTopicOptions('Leadership')}
              />
            )}
          />
          <Controller
            name="topics[mentorShip]"
            control={control}
            defaultValue={props.hydrate?.topics?.mentorShip || []}
            render={({ field }) => (
              <Select
                {...field}
                closeMenuOnSelect={false}
                menuPlacement="top"
                placeholder="Mentorship"
                isMulti
                classNamePrefix="select"
                options={getTopicOptions('Mentorship')}
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
                menuPlacement="top"
                placeholder="Career"
                isMulti
                classNamePrefix="select"
                options={getTopicOptions('Career Advice')}
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
                closeMenuOnSelect={false}
                menuPlacement="top"
                placeholder="Job Search"
                isMulti
                classNamePrefix="select"
                options={getTopicOptions('Job Search')}
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
                closeMenuOnSelect={false}
                menuPlacement="top"
                placeholder="Skills"
                isMulti
                classNamePrefix="select"
                options={getTopicOptions('Skills')}
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
