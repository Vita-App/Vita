import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import { TextField, Typography, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

interface Props {
  label: string;
  error?: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
}

const StyledTextField = styled(TextField)({
  marginTop: '0.5rem',
  '& .MuiInputBase-root': {
    borderRadius: '16px',
    fontSize: '0.85rem',
  },
});

const Input: React.FC<Props> = (props) => {
  const [visible, setVisible] = useState(false);

  let { type } = props;

  if (type === 'password' && visible) {
    type = 'text';
  }

  return (
    <>
      <Typography variant="body2">{props.label}</Typography>
      <StyledTextField
        type={type}
        fullWidth
        placeholder={props.placeholder}
        required={Boolean(props.required)}
        error={Boolean(props.error)}
        helperText={props.error && props.error}
        InputProps={{
          endAdornment: props.type === 'password' && (
            <IconButton onClick={() => setVisible(!visible)}>
              {visible ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          ),
        }}
      />
    </>
  );
};

export default Input;
