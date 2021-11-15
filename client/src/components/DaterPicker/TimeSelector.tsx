import React from 'react';
import { styled } from '@mui/material';

interface TimeSelectorProps {
  date: Date | null;
  time: Date | null;
  setTime: React.Dispatch<React.SetStateAction<Date | null>>;
}

const TimeSelector: React.FC<TimeSelectorProps> = (props) => {
  const x = 1;
  return (
    <div style={{ backgroundColor: 'white', padding: '0px 8px' }}>
      <div className="">HEY</div>
    </div>
  );
};

export default TimeSelector;
