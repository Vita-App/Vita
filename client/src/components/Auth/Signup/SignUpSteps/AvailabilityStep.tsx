import React, { useState } from 'react';
import { FieldValues } from 'react-hook-form';
import {
  Stack,
  Typography,
  Divider,
  Box,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import { StyledButton } from './utils';
import DayTimePicker from 'components/DayTimePicker';
import { SlotType } from 'types';

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const AvailabilityStep: React.FC<{
  onBack: (step: number, formData: FieldValues) => void;
  onContinue: (step: number, formData: FieldValues) => void;
  hydrate: FieldValues;
}> = (props) => {
  const [availability, setAvailability] = useState<FieldValues>(
    props.hydrate || {},
  );

  const onBackClick = () => {
    props.onBack(2, availability);
  };

  const onContinueClick = () => {
    props.onContinue(2, availability);
  };

  const onDayChange = (day: string, slots: SlotType[]) => {
    setAvailability((prev) => ({
      ...prev,
      [day]: slots,
    }));
  };

  const onDefaultClick = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.currentTarget.checked) return;

    setAvailability({
      Sat: [
        {
          id: 1,
          start: new Date(2021, 0, 1, 11, 0),
          end: new Date(2021, 0, 1, 13, 0),
        },
      ],
      Sun: [
        {
          id: 1,
          start: new Date(2021, 0, 1, 11, 0),
          end: new Date(2021, 0, 1, 13, 0),
        },
      ],
    });
  };

  return (
    <Stack spacing={3} mt={2} component="form">
      <Typography variant="h4">Tell us about your Availability</Typography>
      <Stack justifyContent="space-between" direction="row" alignItems="center">
        <Typography variant="body2" mb={1}>
          Set your weekly hours
        </Typography>
        <FormControlLabel
          control={<Checkbox onChange={onDefaultClick} />}
          label="Use Default"
        />
      </Stack>
      <Stack>
        {days.map((day, index) => (
          <Box key={index}>
            <Divider />
            <DayTimePicker
              day={day}
              key={index}
              slots={availability[day] ? (availability[day] as SlotType[]) : []}
              setSlots={(day, slots) => onDayChange(day, slots)}
            />
            <Divider />
          </Box>
        ))}
      </Stack>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <StyledButton onClick={onBackClick}>Back</StyledButton>
        <StyledButton
          onClick={onContinueClick}
          variant="contained"
          sx={{ flex: 0.3 }}>
          Finish
        </StyledButton>
      </Stack>
    </Stack>
  );
};

export default AvailabilityStep;
