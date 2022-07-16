import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import React from 'react';
import { MenuItemType } from 'types';

interface SingleDropDownItemProps {
  options: MenuItemType[];
  value: unknown;
  onChange: (...event: any[]) => void;
  label?: string;
}

const generateSelectOptions = (options: MenuItemType[]) =>
  options.map((option) => (
    <MenuItem key={option.value} value={option.value}>
      {option.label}
    </MenuItem>
  ));

export const SingleDropDownItem: React.FC<SingleDropDownItemProps> = ({
  options,
  onChange,
  value,
}) => (
  <Select onChange={onChange} value={value}>
    {generateSelectOptions(options)}
  </Select>
);
