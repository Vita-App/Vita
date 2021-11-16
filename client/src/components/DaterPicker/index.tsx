import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import Calendar from './Calendar';
import TimeSelector from './TimeSelector';
import Confirmation from './ConfirmationPage';
const Scheduler = () => {
  const [date, setDate] = useState<Date | null>(null);
  const [time, setTime] = useState<Date | null>(null);
  return (
    <>
      {time === null && (
        <>
          <Grid
            container
            direction="row"
            justifyContent="center"
            maxHeight="400px">
            <Calendar date={date} setDate={setDate} />
            {/* <Divider orientation="vertical" flexItem /> */}
            <TimeSelector date={date} time={time} setTime={setTime} />
          </Grid>
        </>
      )}
      {time !== null && (
        <>
          <Grid
            alignItems="center"
            direction="column"
            style={{
              padding: '1rem',
              backgroundColor: 'rgb(48 48 48)',
              color: '#f5f5f5',
            }}>
            <Confirmation time={time} setTime={setTime} />
          </Grid>
        </>
      )}
    </>
  );
};

export default Scheduler;
