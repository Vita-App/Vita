import React, { useState } from 'react';
import { TimePicker } from '@mui/lab';
import { Stack, TextField, Typography } from '@mui/material';

interface Props {
  id: number;
  onChange: (id: number, start: Date | null, end: Date | null) => void;
  start: Date | null;
  end: Date | null;
}

const TimeRangePicker: React.FC<Props> = ({ id, onChange, start, end }) => {
  const [startTime, setStartTime] = useState<Date | null>(start);
  const [endTime, setEndTime] = useState<Date | null>(end);
  const [startTimeError, setStartTimeError] = useState('');
  const [endTimeError, setEndTimeError] = useState('');

  const onStartTimeChange = (time: Date | null) => {
    setStartTime(time);

    if (time === null) {
      setStartTimeError('Please select a start time');
    } else {
      setStartTimeError('');
    }

    if (time && startTime && time.getTime() < startTime.getTime()) {
      setEndTimeError('End time must be after start time');
    } else {
      setEndTimeError('');
    }

    onChange(id, time, endTime);
  };

  const onEndTimeChange = (time: Date | null) => {
    setEndTime(time);

    if (time === null) {
      setEndTimeError('Please select a end time');
    } else {
      setEndTimeError('');
    }

    if (time && startTime && time.getTime() < startTime.getTime()) {
      setEndTimeError('End time must be after start time');
    } else {
      setEndTimeError('');
    }

    onChange(id, startTime, time);
  };

  return (
    <Stack spacing={1} direction="row" alignItems="center">
      <TimePicker
        value={startTime}
        onChange={onStartTimeChange}
        label="Start"
        renderInput={(params) => (
          <TextField
            {...params}
            sx={{ width: '110px' }}
            size="small"
            error={Boolean(startTimeError)}
          />
        )}
      />
      <Typography variant="body2">-</Typography>
      <TimePicker
        value={endTime}
        onChange={onEndTimeChange}
        label="End"
        renderInput={(params) => (
          <TextField
            {...params}
            sx={{ width: '110px' }}
            size="small"
            error={Boolean(endTimeError)}
          />
        )}
      />
    </Stack>
  );
};

export default TimeRangePicker;
