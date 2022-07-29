import { Edit } from '@mui/icons-material';
import { Box, Button, Stack, TextField, Typography } from '@mui/material';
import { MultiSelectElement } from 'components/common';
import { expertiseOptions } from 'data';
import React, { ReactElement, useEffect, useState } from 'react';
import { Controller, FieldValues, useForm } from 'react-hook-form';
import { commaString } from 'utils/helper';

interface IProps {
  label: string;
  name: string;
  value?: string | string[];
  updateLabel?: string;
}

interface SelectOption {
  label: string;
  value: string;
}

const makeOptions = (options: string[]): SelectOption[] =>
  options.map((option) => ({
    label: option,
    value: option,
  }));

const getProperValue = (value: string | string[]) => {
  if (value instanceof Array) {
    return makeOptions(value);
  }

  return value;
};

const EditableField: React.FC<IProps> = (props) => {
  const [original, setOriginal] = useState<string | SelectOption[]>();
  const [disabled, setDisabled] = useState(true);
  const { handleSubmit, control, setValue } = useForm();

  const onSubmit = (data: FieldValues) => {
    console.log(data);
  };

  const onCancel = () => {
    setValue(props.name, original);
    setDisabled(true);
  };

  const getControl = () => {
    let input: ReactElement;

    if (typeof props.value === 'string') {
      input = (
        <Controller
          name={props.name}
          control={control}
          defaultValue={props.value}
          render={({ field }) => <TextField {...field} />}
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
          validation={{
            required: 'Please select at least one expertise',
          }}
          label="Expertise"
        />
      );
    } else {
      throw new Error('Invalid value type');
    }

    return input;
  };

  useEffect(() => {
    if (props.value) setOriginal(getProperValue(props.value));
  }, [props.value]);

  if (!props.value) return null;

  return (
    <Box>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="flex-start">
        <Stack mb={2} spacing={2}>
          <Typography variant="h6">{props.label}</Typography>
          <Typography variant="body1">
            {disabled
              ? props.value instanceof Array
                ? commaString(props.value)
                : props.value
              : props.updateLabel}
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
          <Button variant="contained" color="primary" sx={{ mt: 2 }}>
            Update
          </Button>
        </Stack>
      )}
    </Box>
  );
};

export default EditableField;
