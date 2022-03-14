import { styled } from '@mui/material/styles';
import { TextField, Button } from '@mui/material';

const StyledButton = styled(Button)({
  borderRadius: '10px',
  textTransform: 'capitalize',
});

const StyledTextField = styled(TextField)({
  marginTop: '0.5rem',
  '& .MuiInputBase-root': {
    borderRadius: '16px',
    fontSize: '0.85rem',
  },
});

export { StyledButton, StyledTextField };
