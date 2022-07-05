// import React from 'react';
// import CloseIcon from '@mui/icons-material/Cancel';
// import { Control, Controller, FieldError } from 'react-hook-form';
// import {
//   Checkbox,
//   Chip,
//   FormControl,
//   FormHelperText,
//   InputLabel,
//   ListItemText,
//   MenuItem,
//   Select,
//   SelectProps,
// } from '@mui/material';

// interface MenuItemType {
//   label: string;
//   value: number;
// }

// type MultiSelectElementProps = Omit<SelectProps, 'value'> & {
//   menuItems: MenuItemType[];
//   label?: string;
//   itemKey?: string;
//   itemValue?: string;
//   itemLabel?: string;
//   required?: boolean;
//   validation?: any;
//   name: string;
//   parseError?: (error: FieldError) => string;
//   minWidth?: number;
//   menuMaxHeight?: number;
//   menuMaxWidth?: number;
//   helperText?: string;
//   showChips?: boolean;
//   control?: Control<any>;
//   showCheckbox?: boolean;
// };

// const ITEM_HEIGHT = 48;
// const ITEM_PADDING_TOP = 8;

// export const MultiSelectElement = ({
//   menuItems,
//   label = '',
//   itemKey = '',
//   itemValue = '',
//   itemLabel = '',
//   required = false,
//   validation = {},
//   parseError,
//   name,
//   menuMaxHeight = ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
//   menuMaxWidth = 250,
//   minWidth = 120,
//   helperText,
//   showChips,
//   variant,
//   control,
//   showCheckbox,
//   ...rest
// }: MultiSelectElementProps) => {
//   if (required && !validation.required) {
//     validation.required = 'This field is required';
//   }

//   return (
//     <Controller
//       name={name}
//       rules={validation}
//       control={control}
//       render={({
//         field: { value, onChange, onBlur },
//         fieldState: { invalid, error },
//       }) => {
//         helperText = error
//           ? typeof parseError === 'function'
//             ? parseError(error)
//             : error.message
//           : helperText;
//         return (
//           <FormControl
//             variant={variant}
//             style={{ minWidth }}
//             fullWidth={rest.fullWidth}
//             error={invalid}>
//             {label && (
//               <InputLabel
//                 error={invalid}
//                 htmlFor={rest.id || `select-multi-select-${name}`}
//                 required={required}>
//                 {label}
//               </InputLabel>
//             )}
//             <Select
//               {...rest}
//               id={rest.id || `select-multi-select-${name}`}
//               multiple
//               label={label || undefined}
//               error={invalid}
//               value={value || []}
//               required={required}
//               onChange={onChange}
//               onBlur={onBlur}
//               MenuProps={{
//                 PaperProps: {
//                   style: {
//                     maxHeight: menuMaxHeight,
//                     width: menuMaxWidth,
//                   },
//                 },
//               }}
//               renderValue={
//                 typeof rest.renderValue === 'function'
//                   ? rest.renderValue
//                   : showChips
//                   ? (selected: MenuItemType[]) => (
//                       <div style={{ display: 'flex', flexWrap: 'wrap' }}>
//                         {selected.map((selectedValue) => (
//                           <Chip
//                             key={selectedValue.value}
//                             label={selectedValue.label}
//                             style={{ display: 'flex', flexWrap: 'wrap' }}
//                             onDelete={() => {
//                               console.log(value);
//                               onChange(
//                                 value.filter(
//                                   (i: MenuItemType) => i !== selectedValue,
//                                 ),
//                               );
//                               // setValue(name, formValue.filter((i: any) => i !== value), { shouldValidate: true })
//                             }}
//                             deleteIcon={
//                               <CloseIcon
//                                 onMouseDown={(ev) => {
//                                   ev.stopPropagation();
//                                 }}
//                               />
//                             }
//                           />
//                         ))}
//                       </div>
//                     )
//                   : (selected) => selected?.join(', ')
//               }>
//               {menuItems.map((item: MenuItemType) => {
//                 const isChecked = value?.includes(item) ?? false;
//                 // const key = itemValue || itemKey;
//                 // const val = key ? item[key] : item;
//                 console.log(menuItems);
//                 return (
//                   <MenuItem
//                     key={item.value}
//                     value={item.value}
//                     sx={{
//                       fontWeight: (theme) =>
//                         isChecked
//                           ? theme.typography.fontWeightBold
//                           : theme.typography.fontWeightRegular,
//                     }}>
//                     {showCheckbox && <Checkbox checked={isChecked} />}
//                     <ListItemText primary={item.label} />
//                   </MenuItem>
//                 );
//               })}
//             </Select>
//             {helperText && <FormHelperText>{helperText}</FormHelperText>}
//           </FormControl>
//         );
//       }}
//     />
//   );
// };

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

export type MultiSelectElementProps = Omit<SelectProps, 'value'> & {
  menuItems: any[];
  label?: string;
  itemKey?: string;
  itemValue?: string;
  itemLabel?: string;
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

export const MultiSelectElement = ({
  menuItems,
  label = '',
  itemKey = '',
  itemValue = '',
  itemLabel = '',
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
      render={({
        field: { value, onChange, onBlur },
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
              value={value || []}
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
                  ? (selected) => (
                      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                        {((selected as any[]) || []).map((selectedValue) => (
                          <Chip
                            key={selectedValue}
                            label={selectedValue}
                            style={{ display: 'flex', flexWrap: 'wrap' }}
                            onDelete={() => {
                              onChange(
                                value.filter((i: any) => i !== selectedValue),
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
                        ))}
                      </div>
                    )
                  : (selected) => selected?.join(', ')
              }>
              {menuItems.map((item: any) => {
                const isChecked = value?.includes(item) ?? false;
                const key = itemValue || itemKey;
                const val = key ? item[key] : item;
                console.log(item, key, val);
                return (
                  <MenuItem
                    key={val}
                    value={val}
                    sx={{
                      fontWeight: (theme) =>
                        isChecked
                          ? theme.typography.fontWeightBold
                          : theme.typography.fontWeightRegular,
                    }}>
                    {showCheckbox && <Checkbox checked={isChecked} />}
                    <ListItemText
                      primary={itemLabel ? item[itemLabel] : item}
                    />
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
