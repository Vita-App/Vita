import React from 'react';
import MaterialToolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';

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

const Toolbar = () => (
  <div>
    <MaterialToolbar sx={{ mt: 4 }}>
      {/* <Typography
        variant="h6"
        component="div"
        sx={{
          flexGrow: 1,
          color: 'white',
          marginLeft: '10%',
          fontWeight: 700,
          fontSize: '2rem',
        }}
      > */}
      <Box sx={{ flexGrow: 1, marginLeft: '10%' }}>
        <StyledButton>VITA APP</StyledButton>
      </Box>
      {/* </Typography> */}
      <Stack direction="row" spacing={3}>
        <StyledButton>Get a match</StyledButton>
        <StyledButton>Find a mentor</StyledButton>
        <StyledButton sx={{ color: 'palevioletred' }}>Login</StyledButton>
      </Stack>
    </MaterialToolbar>
  </div>
);

export default Toolbar;
