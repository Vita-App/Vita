import { Edit } from '@mui/icons-material';
import { useQueryClient } from 'react-query';
import { Box, Button, Stack, TextField, Typography } from '@mui/material';
import axios from 'axios';
import { MultiSelectElement } from 'components/common';
import { SERVER_URL } from 'config.keys';
import { expertiseOptions } from 'data';
import React, { ReactElement, useEffect, useState } from 'react';
import { Controller, FieldValues, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { UserType } from 'types';
import { commaString } from 'utils/helper';
import { useSetRecoilState } from 'recoil';
import { authState } from 'store';

interface IProps {
  label: string;
  name: string;
  value?: string | string[];
  updateLabel?: string;
  validators?: any;
}

interface SelectOption {
  label: string;
  value: string;
}

type UpdateDataFormat = {
  [key: string]: string | string[];
};

const makeOptions = (options: string[]): SelectOption[] =>
  options.map((option) => ({
    label: option,
    value: option,
  }));

const serializeValue = (value: string | string[]) => {
  if (value instanceof Array) {
    return makeOptions(value);
  }

  return value;
};

const deserializeValue = (value: string | SelectOption[]) => {
  if (value instanceof Array) {
    return value.map((option) => option.value);
  }

  return value;
};

const updateProfile = async (apiData: UpdateDataFormat) => {
  const { data } = await axios.put<UserType>(
    `${SERVER_URL}/api/profile`,
    apiData,
    {
      withCredentials: true,
    },
  );

  return data;
};

const EditableField: React.FC<IProps> = (props) => {
  const queryClient = useQueryClient();
  const setAuth = useSetRecoilState(authState);
  const [original, setOriginal] = useState<string | SelectOption[]>();
  const [disabled, setDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
    clearErrors,
  } = useForm();

  const onSubmit = async (data: FieldValues) => {
    const keyName = Object.keys(data)[0];
    const value = deserializeValue(data[keyName]);
    setLoading(true);
    try {
      const data = await updateProfile({ [keyName]: value });
      toast.success('Profile updated successfully');
      queryClient.invalidateQueries('getMentorInfo');
      setAuth((prev) => ({ ...prev, user: { ...prev.user, ...data } }));
      setDisabled(true);
    } catch (err) {
      toast.error('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const onCancel = () => {
    setValue(props.name, original);
    clearErrors();
    setDisabled(true);
  };

  const getControl = () => {
    let input: ReactElement;

    if (typeof props.value === 'string') {
      input = (
        <Controller
          name={props.name}
          control={control}
          rules={props.validators}
          defaultValue={props.value}
          render={({ field }) => (
            <TextField
              {...field}
              error={Boolean(errors[props.name])}
              helperText={<>{errors[props.name]?.message}</>}
            />
          )}
        />
      );
    } else if (props.value instanceof Array) {
      input = (
        <MultiSelectElement
          multiple
          control={control}
          menuItems={expertiseOptions}
          name={props.name}
          defaultValue={makeOptions(props.value)}
          showChips
          validation={props.validators}
          label="Expertise"
        />
      );
    } else {
      throw new Error('Invalid value type');
    }

    return input;
  };

  useEffect(() => {
    if (props.value) {
      setOriginal(serializeValue(props.value));
      setValue(props.name, serializeValue(props.value));
    }
  }, [props.value]);

  const displayValue = () => {
    if (!disabled) {
      return props.updateLabel;
    }

    if (!props.value) {
      return 'Not set';
    }

    if (props.value instanceof Array) {
      return commaString(props.value);
    }

    return props.value;
  };

  return (
    <Box>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="flex-start">
        <Stack mb={2} spacing={2}>
          <Typography variant="h6">{props.label}</Typography>
          <Typography variant="body1" color="textSecondary">
            {displayValue()}
          </Typography>
        </Stack>
        <Button
          onClick={() => {
            if (disabled) setDisabled(false);
            else onCancel();
          }}
          endIcon={disabled ? <Edit /> : null}>
          {disabled ? 'Edit' : 'Cancel'}
        </Button>
      </Stack>
      {!disabled && (
        <Stack
          component="form"
          alignItems="flex-start"
          onSubmit={handleSubmit(onSubmit)}>
          {getControl()}
          <Button
            variant="contained"
            color="primary"
            disabled={loading}
            sx={{ my: 2 }}
            type="submit">
            {loading ? 'Updating' : 'Update'}
          </Button>
        </Stack>
      )}
    </Box>
  );
};

export default EditableField;
