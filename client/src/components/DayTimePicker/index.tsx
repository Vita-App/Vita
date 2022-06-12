import React, { FC } from 'react';
import {
  Checkbox,
  FormControlLabel,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';
import { Add, Delete } from '@mui/icons-material';
import TimeRangePicker from 'components/TimeRangePicker';
import { SlotType } from 'types';

interface Props {
  slots: SlotType[];
  day: string;
  setSlots: (day: string, slots: SlotType[]) => void;
}

const DayTimePicker: FC<Props> = ({ slots, setSlots, day }) => {
  const onAdd = () => {
    setSlots(day, [...slots, { id: slots.length + 1, start: null, end: null }]);
  };

  const onDelete = (id: number) => {
    const filtered = slots.filter((timePicker) => timePicker.id !== id);
    setSlots(day, filtered);
  };

  const onChange = (id: number, start: Date | null, end: Date | null) => {
    setSlots(
      day,
      slots.map((timePicker) => {
        if (timePicker.id === id) {
          return { ...timePicker, start, end };
        }

        return timePicker;
      }),
    );
  };

  const onCheckedChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      if (slots.length === 0) {
        setSlots(day, [{ id: 1, start: null, end: null }]);
      }
    } else {
      setSlots(day, []);
    }
  };

  return (
    <Stack position="relative" spacing={2} my={3} direction="row">
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        spacing={2}
        alignItems={{ xs: 'flex-start', md: 'center' }}>
        <FormControlLabel
          control={
            <Checkbox checked={slots.length > 0} onChange={onCheckedChange} />
          }
          label={day}
        />
        {slots.length === 0 && (
          <Typography variant="body2" color="textSecondary">
            Unavailable
          </Typography>
        )}
        <Stack spacing={2}>
          {slots.map((timePicker) => (
            <Stack
              direction="row"
              key={timePicker.id}
              spacing={1}
              alignItems="center">
              <TimeRangePicker
                id={timePicker.id}
                onChange={onChange}
                start={timePicker.start}
                end={timePicker.end}
              />
              <IconButton color="error" onClick={() => onDelete(timePicker.id)}>
                <Delete />
              </IconButton>
            </Stack>
          ))}
        </Stack>
      </Stack>
      <IconButton
        onClick={onAdd}
        sx={{
          position: 'absolute',
          top: 0,
          right: 0,
        }}>
        <Add />
      </IconButton>
    </Stack>
  );
};

export default DayTimePicker;
