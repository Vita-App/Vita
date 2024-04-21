import React from 'react';
import CloseIcon from '@mui/icons-material/Cancel';
import { Control, Controller, FieldError } from 'react-hook-form';
import {
  Checkbox,
  Chip,
  FormControl,
  FormHelperText,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
  SelectProps,
} from '@mui/material';

interface ItemType {
  label: string;
  value: Object;
}

export type MultiSelectElementProps = Omit<SelectProps, 'value'> & {
  menuItems: ItemType[];
  label?: string;
  required?: boolean;
  validation?: any;
  name: string;
  parseError?: (error: FieldError) => string;
  minWidth?: number;
  menuMaxHeight?: number;
  menuMaxWidth?: number;
  helperText?: string;
  showChips?: boolean;
  control?: Control<any>;
  showCheckbox?: boolean;
};

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const isPresent = (list: ItemType[], item: ItemType) => {
  for (let i = 0; i < list?.length; i++)
    if (list[i].label === item.label) return true;

  return false;
};

export const MultiSelectElement = ({
  menuItems,
  label = '',
  required = false,
  validation = {},
  parseError,
  name,
  menuMaxHeight = ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
  menuMaxWidth = 250,
  minWidth = 120,
  helperText,
  showChips,
  variant,
  control,
  showCheckbox,
  defaultValue,
  ...rest
}: MultiSelectElementProps) => {
  if (required && !validation.required) {
    validation.required = 'This field is required';
  }

  return (
    <Controller
      name={name}
      rules={validation}
      control={control}
      defaultValue={defaultValue}
      render={({
        field: { value: optionSelected, onChange, onBlur },
        fieldState: { invalid, error },
      }) => {
        helperText = error
          ? typeof parseError === 'function'
            ? parseError(error)
            : error.message
          : helperText;
        return (
          <FormControl
            variant={variant}
            style={{ minWidth }}
            fullWidth={rest.fullWidth}
            error={invalid}>
            {label && (
              <InputLabel
                error={invalid}
                htmlFor={rest.id || `select-multi-select-${name}`}
                required={required}>
                {label}
              </InputLabel>
            )}
            <Select
              {...rest}
              id={rest.id || `select-multi-select-${name}`}
              multiple
              label={label || undefined}
              error={invalid}
              value={optionSelected || []}
              required={required}
              onChange={onChange}
              onBlur={onBlur}
              MenuProps={{
                PaperProps: {
                  style: {
                    maxHeight: menuMaxHeight,
                    width: menuMaxWidth,
                  },
                },
              }}
              renderValue={
                typeof rest.renderValue === 'function'
                  ? rest.renderValue
                  : showChips
                    ? (selected: ItemType[]) => (
                        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                          {(selected || []).map(
                            (selectedValue, index: number) => (
                              <Chip
                                key={index}
                                label={selectedValue.label}
                                sx={{
                                  margin: '4px',
                                }}
                                onDelete={() => {
                                  onChange(
                                    optionSelected.filter(
                                      (i: any) => i !== selectedValue,
                                    ),
                                  );
                                  // setValue(name, formValue.filter((i: any) => i !== value), { shouldValidate: true })
                                }}
                                deleteIcon={
                                  <CloseIcon
                                    onMouseDown={(ev) => {
                                      ev.stopPropagation();
                                    }}
                                  />
                                }
                              />
                            ),
                          )}
                        </div>
                      )
                    : (selected) => selected?.join(', ')
              }>
              {menuItems.map((item: ItemType, index: number) => {
                const isChecked = isPresent(optionSelected, item);
                return (
                  // @ts-ignore
                  <MenuItem
                    key={index}
                    value={item}
                    sx={{
                      fontWeight: (theme) =>
                        isChecked
                          ? theme.typography.fontWeightBold
                          : theme.typography.fontWeightRegular,
                    }}>
                    {showCheckbox && <Checkbox checked={isChecked} />}
                    <ListItemText primary={item.label} />
                  </MenuItem>
                );
              })}
            </Select>
            {helperText && <FormHelperText>{helperText}</FormHelperText>}
          </FormControl>
        );
      }}
    />
  );
};
