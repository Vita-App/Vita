import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { styled } from '@mui/material';

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
    key: string;
    value: string;
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
          {data.map(({ key, value }) => (
            <option value={value} key={key}>
              {key}
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
