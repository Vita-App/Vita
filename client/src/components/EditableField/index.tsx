import { Edit } from '@mui/icons-material';
import { Box, Button, Stack, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { Controller, FieldValues, useForm } from 'react-hook-form';

interface IProps {
  label: string;
  name: string;
  value: string;
  updateLabel?: string;
}

const EditableField: React.FC<IProps> = (props) => {
  const [disabled, setDisabled] = useState(true);
  const { handleSubmit, control } = useForm();

  const onSubmit = (data: FieldValues) => {
    console.log(data);
  };

  return (
    <Box>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="flex-start">
        <Stack mb={2} spacing={2}>
          <Typography variant="h6">{props.label}</Typography>
          <Typography variant="h6">
            {disabled ? (props.value as string) : props.updateLabel}
          </Typography>
        </Stack>
        <Button
          onClick={() => setDisabled((prev) => !prev)}
          endIcon={disabled ? <Edit /> : null}>
          {disabled ? 'Edit' : 'Cancel'}
        </Button>
      </Stack>
      {!disabled && (
        <Stack
          component="form"
          alignItems="flex-start"
          onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name={props.name}
            control={control}
            defaultValue={props.value}
            render={({ field }) => <TextField {...field} />}
          />
          <Button variant="contained" color="primary" sx={{ mt: 2 }}>
            Update
          </Button>
        </Stack>
      )}
    </Box>
  );
};

export default EditableField;
