// @ts-nocheck
import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import Calendar from './Calendar';
import TimeSelector from './TimeSelector';
import Confirmation from './ConfirmationPage';
import { DurationType, Topic } from 'types';

interface IProps {
  topic: Topic;
  topics: Topic[];
  close: () => void;
}

const Scheduler: React.FC<IProps> = ({ topic, topics, close }) => {
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
            // flexWrap={'wrap'}
            maxHeight="600px">
            <Calendar
              date={date}
              setDate={setDate}
              setTimeslot={setTimeslot}
              setSelectedSlot={setSelectedSlot}
            />

            {/* <Divider orientation="vertical" flexItem /> */}

            <Grid
              item
              sx={{ display: 'flex', flexGrow: 1, justifyContent: 'center' }}>
              <TimeSelector
                date={date}
                setSelectedSlot={setSelectedSlot}
                timeslot={timeslot}
              />
            </Grid>
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
              topic={topic}
              topics={topics}
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
