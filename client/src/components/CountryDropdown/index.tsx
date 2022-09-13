import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { countries } from './data';
import { ControllerRenderProps, FieldValues } from 'react-hook-form';

const CountrySelect = ({
  field,
}: {
  field: ControllerRenderProps<FieldValues, 'country'>;
}) => (
  <Autocomplete
    id="country-select-demo"
    sx={{ width: 300 }}
    options={countries}
    autoHighlight
    onChange={(_, data) => field.onChange(data?.code)}
    getOptionLabel={(option) => option.label}
    renderOption={(props, option) => (
      <Box
        component="li"
        sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
        {...props}>
        <img
          loading="lazy"
          width="20"
          src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
          srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
          alt=""
        />
        {option.label} ({option.code})
      </Box>
    )}
    renderInput={(params) => (
      <TextField
        {...params}
        inputProps={{
          ...params.inputProps,
          autoComplete: 'new-password', // disable autocomplete and autofill
        }}
        {...field}
      />
    )}
  />
);

export default CountrySelect;
