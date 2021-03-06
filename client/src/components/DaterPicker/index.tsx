// @ts-nocheck
import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import Calendar from './Calendar';
import TimeSelector from './TimeSelector';
import Confirmation from './ConfirmationPage';
import { DurationType } from 'types';

interface IProps {
  close: () => void;
}

const Scheduler: React.FC<IProps> = ({ close }) => {
  const [timeslot, setTimeslot] = useState<DurationType[]>([]);
  const [date, setDate] = useState<Date | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<DurationType | undefined>();
  return (
    <>
      {selectedSlot === undefined && (
        <>
          <Grid
            container
            direction="row"
            justifyContent="center"
            maxHeight="500px">
            <Calendar
              date={date}
              setDate={setDate}
              setTimeslot={setTimeslot}
              setSelectedSlot={setSelectedSlot}
            />
            {/* <Divider orientation="vertical" flexItem /> */}
            <TimeSelector
              date={date}
              setSelectedSlot={setSelectedSlot}
              timeslot={timeslot}
            />
          </Grid>
        </>
      )}
      {selectedSlot !== undefined && (
        <>
          <Grid
            alignItems="center"
            direction="column"
            style={{
              padding: '1rem',
              backgroundColor: 'rgb(48 48 48)',
              color: '#f5f5f5',
            }}>
            <Confirmation
              date={date}
              setDate={setDate}
              selectedSlot={selectedSlot}
              setSelectedSlot={setSelectedSlot}
              close={close}
            />
          </Grid>
        </>
      )}
    </>
  );
};

export default Scheduler;
