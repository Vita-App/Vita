import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { styled } from '@mui/material';
import Reactselect from 'react-select';

export const ReactSelect = styled(Reactselect)({
  margin: '1rem 0rem',
  '.select__single-value': {
    color: '#f5f5f5',
  },
  '.select__control': {
    cursor: 'pointer',
    backgroundColor: '#303030',
  },
  '.select__menu': {
    backgroundColor: '#272626',
  },
  '.select__option--is-focused': {
    backgroundColor: '#424040',
  },
  '.select__option--is-focused:hover': {
    backgroundColor: '#424040',
  },
});

const WrapperDiv = styled('div')({
  width: '100%',
  padding: '1rem',
  '& option': {
    backgroundColor: '#3e3e42 !important',
    fontFamily: 'inter',
    textAlign: 'left',
    padding: '10px',
    flexGrow: 1,
  },
  '& label.Mui-focused': {
    color: '#f5f5f5b9',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: '#f5f5f5b9',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#dfd7d7ea',
    },
    '&:hover fieldset': {
      // BorderColor: 'yellow',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#f5f5f5b9',
    },
  },
});

interface SelectComponentProps {
  dropDownLabel: string;
  helperText: string;
  data: {
    value: string;
    label: string;
  }[];
  option: string | undefined;
  setOption: React.Dispatch<React.SetStateAction<string | undefined>>;
}

const SelectComponent: React.FC<SelectComponentProps> = ({
  data,
  dropDownLabel,
  helperText,
  option,
  setOption,
}) => {
  const handleChange = (event: SelectChangeEvent) => {
    setOption(event.target.value);
  };

  return (
    <WrapperDiv>
      <FormControl sx={{ width: '100%' }}>
        <InputLabel
          id={`label-id-${dropDownLabel}`}
          sx={{ fontWeight: 600, color: '#f5f5f5' }}>
          {dropDownLabel}
        </InputLabel>
        <Select
          style={{ border: '1px solid black' }}
          native
          onChange={handleChange}
          labelId={`label-id-${dropDownLabel}`}
          id={`id-${dropDownLabel}`}
          value={option}
          label={dropDownLabel}>
          {data.map(({ value, label }, index) => (
            <option value={value} key={index}>
              {label}
            </option>
          ))}
        </Select>
        {helperText?.length > 0 && (
          <FormHelperText sx={{ fontWeight: 600, color: '#f5f5f5' }}>
            {helperText}
          </FormHelperText>
        )}
      </FormControl>
    </WrapperDiv>
  );
};

export default SelectComponent;
