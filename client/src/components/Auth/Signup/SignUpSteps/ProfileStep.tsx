import React from 'react';
import { Stack, Typography } from '@mui/material';
import { StyledButton } from './utils';

const ProfileStep: React.FC<{
  onContinue: () => void;
}> = (props) => (
  <Stack spacing={3} py={5} px={7} component="form">
    <Stack>
      <Typography variant="h4">Tell us about yourself</Typography>
    </Stack>
    <Stack direction="row" justifyContent="space-between">
      <div />
      <StyledButton
        onClick={props.onContinue}
        variant="contained"
        sx={{ flex: 0.5 }}>
        Continue
      </StyledButton>
    </Stack>
  </Stack>
);

export default ProfileStep;
