import React from 'react';
import { styled, Grid, Button } from '@mui/material';
// Import Button from 'components/common/Button';
interface TimeSelectorProps {
  date: Date | null;
  time: Date | null;
  setTime: React.Dispatch<React.SetStateAction<Date | null>>;
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

const TimeSelector: React.FC<TimeSelectorProps> = ({ date, time, setTime }) => {
  const x = 1;

  return (
    <Grid
      style={{
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#303030',
        padding: '1rem 2rem',
        height: '360px',
        color: '#f5f5f5',
        overflowY: 'scroll',
      }}>
      <div style={{ fontWeight: 600, marginBottom: '8px' }}>
        {getDate(date)}
      </div>
      {data.map((el, index) => (
        <StyledButton
          variant="outlined"
          key={index}
          onClick={() => setTime(new Date())}>
          {`${index + 1}:00 PM`}
        </StyledButton>
      ))}
    </Grid>
  );
};

export default TimeSelector;

const data = [
  {
    key: new Date().getTime().toLocaleString(),
    value: new Date().toTimeString().split(' ')[0],
  },
  {
    key: new Date().getTime().toLocaleString(),
    value: new Date().toTimeString().split(' ')[0],
  },
  {
    key: new Date().getTime().toLocaleString(),
    value: new Date().toTimeString().split(' ')[0],
  },
  {
    key: new Date().getTime().toLocaleString(),
    value: new Date().toTimeString().split(' ')[0],
  },
  {
    key: new Date().getTime().toLocaleString(),
    value: new Date().toTimeString().split(' ')[0],
  },
  {
    key: new Date().getTime().toLocaleString(),
    value: new Date().toTimeString().split(' ')[0],
  },
  {
    key: new Date().getTime().toLocaleString(),
    value: new Date().toTimeString().split(' ')[0],
  },
  {
    key: new Date().getTime().toLocaleString(),
    value: new Date().toTimeString().split(' ')[0],
  },
  {
    key: new Date().getTime().toLocaleString(),
    value: new Date().toTimeString().split(' ')[0],
  },
  {
    key: new Date().getTime().toLocaleString(),
    value: new Date().toTimeString().split(' ')[0],
  },
  {
    key: new Date().getTime().toLocaleString(),
    value: new Date().toTimeString().split(' ')[0],
  },
  {
    key: new Date().getTime().toLocaleString(),
    value: new Date().toTimeString().split(' ')[0],
  },
  {
    key: new Date().getTime().toLocaleString(),
    value: new Date().toTimeString().split(' ')[0],
  },
  {
    key: new Date().getTime().toLocaleString(),
    value: new Date().toTimeString().split(' ')[0],
  },
];
