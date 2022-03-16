import { styled } from '@mui/material/styles';
import { TextField, Button } from '@mui/material';
import { ReactSelect } from 'components/common';

const StyledButton = styled(Button)({
  borderRadius: '10px',
  textTransform: 'capitalize',
});

const StyledTextField = styled(TextField)({
  marginTop: '0.5rem',
  '& .MuiInputBase-root': {
    // borderRadius: '16px',
    fontSize: '0.85rem',
  },
});

const StyledReactSelect = styled(ReactSelect)({
  '.select__control': {
    borderColor: '#767676',
    backgroundColor: 'transparent',
    padding: '6px',
  },
  '.select__input-container': {
    borderColor: '#767676',
    backgroundColor: 'transparent',
  },
  '.select__control:hover': {
    borderColor: '#fff',
  },
  '.select__multi-value': {
    backgroundColor: '#444444',
    borderRadius: '10px',
    color: '#fff',
  },
  '.select__multi-value__label': {
    color: '#fff',
  },
  '.select__multi-value__remove': {
    backgroundColor: 'transparent',
  },
  '.select__multi-value__remove:hover': {
    backgroundColor: 'transparent',
  },
  '.select__menu': {
    overflow: 'auto',
  },
});

export { StyledButton, StyledTextField, StyledReactSelect };
