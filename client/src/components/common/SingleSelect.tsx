import React from 'react';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { MenuItemType } from 'types';
import { InputLabel } from '@mui/material';

interface SingleDropDownItemProps {
  error?: string;
  options: MenuItemType[];
  value: unknown;
  onChange: (...event: any[]) => void;
  label?: string;
  placeholder?: string;
  name?: string;
}

const generateSelectOptions = (options: MenuItemType[]) =>
  options.map((option) => (
    <MenuItem key={option.value} value={option.value}>
      {option.label}
    </MenuItem>
  ));

export const SingleDropDownItem: React.FC<SingleDropDownItemProps> = ({
  error,
  options,
  onChange,
  value,
  label,
  name,
}) => (
  <FormControl error={Boolean(error)}>
    {label && (
      <InputLabel
        error={Boolean(error)}
        htmlFor={`select-multi-select-${name}`}>
        {label}
      </InputLabel>
    )}
    <Select
      onChange={onChange}
      value={value}
      error={Boolean(error)}
      id={`select-multi-select-${name}`}
      label={label || undefined}>
      {generateSelectOptions(options)}
    </Select>
    {error && <FormHelperText>{error}</FormHelperText>}
  </FormControl>
);
