import React from 'react';
import { styled, Grid, Button } from '@mui/material';
import { DurationType } from 'types';
import { getDurationLabel } from 'utils/helper';
interface TimeSelectorProps {
  date: Date | null;
  timeslot: DurationType[];
  setSelectedSlot: React.Dispatch<React.SetStateAction<DurationType>>;
}
const getDate = (_date: Date | null) => {
  const date = _date ? _date : new Date();
  const text = _date ? 'Selected Date' : 'Todays Date';

  return text + ': ' + date.toLocaleDateString('en-gb');
};

const StyledButton = styled(Button)`
  color: white;
  margin: 8px;
  /* border: 1px solid rgb(122 99 240 / 50%); */

  :hover {
    /* border: 1px solid rgb(122 99 240 / 50%); */
    /* background: rgb(122 99 240 / 50%); */
  }
`;

const TimeSelector: React.FC<TimeSelectorProps> = ({
  date,
  setSelectedSlot,
  timeslot,
}) => {
  if (!date) return <div />;
  if (timeslot.length === 0) return <div />;

  return (
    <Grid
      style={{
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#303030',
        padding: '1rem 2rem',
        height: '100%',
        color: '#f5f5f5',
        overflowY: 'scroll',
      }}>
      <div style={{ fontWeight: 600, marginBottom: '8px' }}>
        {getDate(date)}
      </div>
      {timeslot.map((slot, index) => (
        <StyledButton
          variant="outlined"
          key={index}
          onClick={() => setSelectedSlot(slot)}>
          {getDurationLabel(slot)}
        </StyledButton>
      ))}
    </Grid>
  );
};

export default TimeSelector;
