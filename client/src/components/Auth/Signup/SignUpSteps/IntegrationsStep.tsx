import React from 'react';
import { FieldValues } from 'react-hook-form';
import { Stack, Typography, Avatar } from '@mui/material';
import { CalendarToday, Power } from '@mui/icons-material';
import { StyledButton } from './utils';

const IntegrationStep: React.FC<{
  onBack: (step: number, formData: FieldValues) => void;
  onContinue: (step: number, formData: FieldValues) => void;
}> = (props) => {
  const onConnectGoogleCalender = () => {};
  const onConnectOutlookCalender = () => {};

  return (
    <Stack mt={2} spacing={3}>
      <Typography variant="h4">Connect your calendar(s)</Typography>
      <Typography variant="body2" color="textSecondary">
        Connect your calendar to auto-check for busy times and add new sessions
        as they are scheduled.
      </Typography>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Stack direction="row" spacing={1} alignItems="center">
          <Avatar>
            <CalendarToday />
          </Avatar>
          <Typography variant="body2">Google Calendar</Typography>
        </Stack>
        <StyledButton onClick={onConnectGoogleCalender} variant="outlined">
          <Typography variant="body2">Connect</Typography>
          <Power />
        </StyledButton>
      </Stack>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Stack direction="row" spacing={1} alignItems="center">
          <Avatar>
            <CalendarToday />
          </Avatar>
          <Typography variant="body2">Outlook Calendar</Typography>
        </Stack>
        <StyledButton onClick={onConnectOutlookCalender} variant="outlined">
          <Typography variant="body2">Connect</Typography>
          <Power />
        </StyledButton>
      </Stack>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <StyledButton onClick={() => props.onBack(2, {})}>Back</StyledButton>
        <StyledButton
          onClick={() => props.onContinue(2, {})}
          variant="contained"
          sx={{ flex: 0.3 }}>
          Finish
        </StyledButton>
      </Stack>
    </Stack>
  );
};

export default IntegrationStep;
