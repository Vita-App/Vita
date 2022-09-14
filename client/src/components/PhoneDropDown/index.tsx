import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { ControllerRenderProps, FieldValues } from 'react-hook-form';
import { countries } from 'data/countryCode';

const CountrySelect = ({
  field,
}: {
  field: ControllerRenderProps<FieldValues, 'phoneCode'>;
}) => (
  <>
    <Autocomplete
      id="country-select-demo"
      // sx={{ flexGrow: 1 }}
      options={countries}
      value={countries.find((country) => country.phone === field.value)}
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
          {option.phone} ({option.code})
        </Box>
      )}
      renderInput={(params) => (
        <TextField
          sx={{ width: '200px' }}
          {...params}
          variant="standard"
          inputProps={{
            ...params.inputProps,
            autoComplete: 'new-password', // disable autocomplete and autofill
          }}
          InputProps={{
            ...params.InputProps,
            startAdornment: (
              <img
                width="20"
                src={`https://flagcdn.com/w40/${field.value.toLowerCase()}.png`}
                srcSet={`https://flagcdn.com/w80/${field.value.toLowerCase()}.png 2x`}
                alt=""
              />
            ),
          }}
        />
      )}
    />
  </>
);

export default CountrySelect;
