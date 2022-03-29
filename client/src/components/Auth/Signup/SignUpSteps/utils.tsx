import { styled } from '@mui/material/styles';
import { TextField, Button } from '@mui/material';
import { ReactSelect } from 'components/common';

const StyledButton = styled(Button)({
  fontWeight: 'bolder',
  borderRadius: '10px',
  textTransform: 'capitalize',
});

const StyledTextField = styled(TextField)({
  marginTop: '0.5rem',
  '& .MuiInputBase-root': {
    // borderRadius: '16px',
    fontSize: '0.85rem',
  },
  '& :-webkit-autofill': {
    '-webkit-box-shadow': '0 0 0 100px #222222 inset !important',
    '-webkit-text-fill-color': '#fff',
    caretColor: '#fff',
    borderRadius: 'inherit',
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
