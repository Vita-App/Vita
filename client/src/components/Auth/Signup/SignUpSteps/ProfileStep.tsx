import React, { useEffect, useRef, useState } from 'react';
import { useForm, FieldValues, Controller } from 'react-hook-form';
import {
  Stack,
  Typography,
  Avatar,
  Chip,
  CircularProgress,
} from '@mui/material';
import { interestOptions, streamOptions } from 'data';
import {
  StyledTextField,
  MuiStyledButton as StyledButton,
  SingleDropDownItem,
  StyledReactSelect,
} from 'components/common';
import { useMutation, useQuery } from 'react-query';
import { SERVER_URL } from 'config.keys';
import axios from 'axios';

const checkPhone = async (phone: string) => {
  const { data } = await axios.get(
    `${SERVER_URL}/api/check-phone?phone=${phone}`,
  );
  return data;
};

interface RestCountriesAPIResponse {
  name: string;
  callingCodes?: string[];
  flags: { png: string; svg: string };
}

interface CountryData {
  value: string;
  label: {
    name: string;
    flag: string;
    code: string;
  };
}

const defaultCountry: CountryData[] = [
  {
    value: 'India',
    label: {
      name: 'India',
      flag: 'https://flagcdn.com/in.svg',
      code: '91',
    },
  },
];

const getCountryCodes = async () => {
  const { data } = await axios.get<RestCountriesAPIResponse[]>(
    'https://restcountries.com/v2/all',
  );

  const options: CountryData[] = [];

  data.forEach((country) =>
    country.callingCodes?.forEach((code) => {
      options.push({
        value: country.name,
        label: {
          name: country.name,
          flag: country.flags.svg || country.flags.png,
          code,
        },
      });
    }),
  );

  return options;
};

const ProfileStep: React.FC<{
  onContinue: (step: number, formData: FieldValues) => void;
  hydrate?: FieldValues;
  interests: string[];
  setInterests: (interests: string[]) => void;
  isMentor: boolean;
}> = (props) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    getValues,
    setError,
  } = useForm();

  const [avatarSrc, setAvatarSrc] = useState('');
  const profilePicRef = useRef<HTMLInputElement>();

  const { data: CountryCodeData } = useQuery<CountryData[]>(
    'countryCodes',
    getCountryCodes,
  );

  const mutation = useMutation(
    'check-phone',
    (phone: string) => checkPhone(phone),
    {
      onSuccess: (data) => {
        if (data) {
          setError('phone', {
            type: 'manual',
            message: 'Phone number is already in use',
          });
          return;
        }

        let file;
        if (
          profilePicRef.current!.files &&
          profilePicRef.current!.files.length > 0
        ) {
          file = profilePicRef.current!.files[0];
        } else if (avatarSrc) {
          file = props.hydrate?.profilePicture;
        }

        const form = getValues();

        props.onContinue(0, {
          ...form,
          profilePicture: file,
        });
      },
    },
  );

  const onSubmit = (data: FieldValues) => {
    mutation.mutate(`${data.countryCode.label.code}${data.phone}`);
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
      try {
        const reader = new FileReader();

        reader.readAsDataURL(props.hydrate.profilePicture);
        reader.onload = () => {
          setAvatarSrc(reader.result as string);
        };
      } catch (err) {}
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
      <Stack direction={{ xs: 'column', md: 'row' }} spacing={1}>
        <Stack flexGrow={1} position="relative">
          <Typography variant="body2">Phone (Whatsapp)</Typography>
          <Controller
            name="phone"
            control={control}
            defaultValue={props.hydrate?.phone || ''}
            rules={{
              required: 'Phone Number is Required',
              pattern: {
                value: /^\d{10}$/,
                message: 'Invalid Phone Number',
              },
            }}
            render={({ field }) => (
              <StyledTextField
                {...field}
                error={Boolean(errors.phone)}
                helperText={errors.phone?.message}
                placeholder="Enter a phone number"
                InputProps={{
                  startAdornment: (
                    <Controller
                      name="countryCode"
                      control={control}
                      defaultValue={
                        props.hydrate?.countryCode || defaultCountry[0]
                      }
                      render={({ field }) => (
                        <StyledReactSelect
                          styles={{
                            control: (base) => ({
                              ...base,
                              width: '150px',
                              border: 0,
                              // This line disable the blue border
                              boxShadow: 'none',
                            }),
                          }}
                          {...field}
                          placeholder=""
                          classNamePrefix="select"
                          options={CountryCodeData || defaultCountry}
                          formatOptionLabel={(option: any) => (
                            <Stack direction="row" alignItems="center">
                              <img
                                src={option.label.flag}
                                style={{
                                  height: '16x',
                                  width: '24px',
                                  marginRight: '15px',
                                }}
                              />
                              +{option.label.code}
                            </Stack>
                          )}
                        />
                      )}
                    />
                  ),
                }}
              />
            )}
          />
        </Stack>
        <Stack flexGrow={1}>
          <Typography variant="body2">Graduation year</Typography>
          <Controller
            name="graduation_year"
            control={control}
            defaultValue={props.hydrate?.graduation_year || ''}
            rules={{
              required: 'Graduation Year is Required',
              pattern: { value: /^[0-9]{4}$/, message: 'Invalid Year' },
              min: { value: minGraduationYear, message: 'Invalid Year' },
              max: { value: maxGraduationYear, message: 'Invalid Year' },
            }}
            render={({ field }) => (
              <StyledTextField
                {...field}
                error={Boolean(errors.graduation_year)}
                helperText={errors.graduation_year?.message}
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
          render={({ field, fieldState: { error } }) => (
            <SingleDropDownItem
              name="stream"
              onChange={field.onChange}
              value={field.value}
              options={streamOptions}
              error={error?.message}
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
      {!props.isMentor && (
        <Stack>
          <Typography variant="body2">Referal code (Optional)</Typography>
          <Controller
            name="referalCode"
            control={control}
            defaultValue={props.hydrate?.referalCode || ''}
            render={({ field }) => (
              <StyledTextField
                {...field}
                placeholder="Enter your referal code"
              />
            )}
          />
        </Stack>
      )}
      <Stack direction="row" justifyContent="center">
        <StyledButton
          type="submit"
          variant="contained"
          sx={{ flex: 0.5 }}
          disabled={mutation.isLoading}>
          {mutation.isLoading ? (
            <CircularProgress variant="indeterminate" sx={{ width: '50px' }} />
          ) : (
            'Continue'
          )}
        </StyledButton>
      </Stack>
    </Stack>
  );
};

export default ProfileStep;
