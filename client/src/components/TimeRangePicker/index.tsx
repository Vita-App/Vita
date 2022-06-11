import React, { useState } from 'react';
import { TimePicker } from '@mui/lab';
import { Stack, TextField, Typography } from '@mui/material';

interface Props {
  id: number;
  onChange: (
    id: number,
    start: Date | null,
    end: Date | null,
    error?: boolean,
  ) => void;
  start: Date | null;
  end: Date | null;
}

const TimeRangePicker: React.FC<Props> = ({ id, onChange, start, end }) => {
  const [startTime, setStartTime] = useState<Date | null>(start);
  const [endTime, setEndTime] = useState<Date | null>(end);
  const [startTimeError, setStartTimeError] = useState(
    !start && 'Start time is required',
  );
  const [endTimeError, setEndTimeError] = useState(
    !end && 'End time is required',
  );

  const onStartTimeChange = (time: Date | null) => {
    setStartTime(time);
    if (!time) {
      setStartTimeError('Start time is required');
    } else if (time?.toString() === 'Invalid Date') {
      setStartTimeError('Invalid time');
    } else if (endTime && time.getTime() >= endTime.getTime()) {
      setStartTimeError('Start time must be before end time');
    } else if (endTime && time.getTime() < endTime.getTime()) {
      setStartTimeError('');
      setEndTimeError('');
    } else {
      setStartTimeError('');
    }

    onChange(
      id,
      time,
      endTime,
      Boolean(startTimeError) || Boolean(endTimeError),
    );
  };

  const onEndTimeChange = (time: Date | null) => {
    setEndTime(time);
    if (!time) {
      setEndTimeError('End time is required');
    } else if (time?.toString() === 'Invalid Date') {
      setEndTimeError('Invalid Time');
    } else if (startTime && time.getTime() <= startTime.getTime()) {
      setEndTimeError('End time must be after start time');
    } else if (startTime && time.getTime() > startTime.getTime()) {
      setEndTimeError('');
      setStartTimeError('');
    } else {
      setEndTimeError('');
    }

    onChange(
      id,
      startTime,
      time,
      Boolean(startTimeError) || Boolean(endTimeError),
    );
  };

  return (
    <Stack>
      <Stack spacing={1} direction="row" alignItems="center">
        <TimePicker
          value={startTime}
          onChange={onStartTimeChange}
          label="Start"
          renderInput={(params) => (
            <TextField
              {...params}
              sx={{ width: '130px' }}
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
              sx={{ width: '130px' }}
              size="small"
              error={Boolean(endTimeError)}
            />
          )}
        />
      </Stack>

      <Stack direction="row" spacing={2} justifyContent="space-between">
        {startTimeError && (
          <Typography variant="caption" color="error">
            {startTimeError}
          </Typography>
        )}
        {endTimeError && (
          <Typography variant="caption" color="error" ml="auto">
            {endTimeError}
          </Typography>
        )}
      </Stack>
    </Stack>
  );
};

export default TimeRangePicker;
