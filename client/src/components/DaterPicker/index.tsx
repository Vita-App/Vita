import React, { useState } from 'react';
import { Stack, Divider } from '@mui/material';
import Calendar from './Calendar';
import TimeSelector from './TimeSelector';
const Scheduler = () => {
  const [date, setDate] = React.useState<Date | null>(null);
  const [time, setTime] = React.useState<Date | null>(null);
  return (
    <>
      <Stack direction="row">
        <Calendar date={date} setDate={setDate} />
        <Divider orientation="vertical" flexItem />
        <TimeSelector date={date} time={time} setTime={setTime} />
      </Stack>
    </>
  );
};

export default Scheduler;
