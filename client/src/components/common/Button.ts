import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';

const StyledButton = styled(Button)(({ theme }) => ({
  background: 'rgb(59,57,57,0.4)',
  textTransform: 'none',
  color: '#f5f5f5',
  fontWeight: 700,
  // Margin: '1rem',
  padding: '12px 16px',
  '&:hover': {
    opacity: 1,
    backgroundColor: '#424040',
  },
}));

export default StyledButton;
