/* eslint-disable operator-linebreak */
import * as React from 'react';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import CalendarPicker from '@mui/lab/CalendarPicker';
import { CalendarPickerSkeleton, PickersDay } from '@mui/lab';
import { styled } from '@mui/material/styles';

const Wrapper = styled('div')`
  div[role='presentation'] {
    pointer-events: none;
  }
  button[aria-label='calendar view is open, switch to year view'] {
    display: none;
  }
`;

interface CalendarProps {
  date: Date | null;
  setDate: React.Dispatch<React.SetStateAction<Date | null>>;
}

const Calendar: React.FC<CalendarProps> = ({ date, setDate }) => {
  const currDate = new Date();
  const minDate = new Date(currDate.getFullYear(), currDate.getMonth(), 1);
  const maxDate = new Date(currDate.getFullYear(), currDate.getMonth() + 2, 0);
  const [highlightedDays] = React.useState([1, 2, 3, 4, 5]);

  const classes = {
    selected: {
      border: '1px solid #1565c0',
      color: '#1565c0',
    },
    notSelected: {},
  } as const;

  return (
    <div style={{ backgroundColor: 'white' }}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Wrapper>
          <CalendarPicker
            date={date}
            minDate={minDate}
            maxDate={maxDate}
            onChange={(e) => setDate(e)}
            renderLoading={() => <CalendarPickerSkeleton />}
            renderDay={(day, _value, DayComponentProps) => {
              const isSelected =
                !DayComponentProps.outsideCurrentMonth &&
                highlightedDays.indexOf(day.getDate()) >= 0;
              DayComponentProps = {
                ...DayComponentProps,
                disabled: !isSelected,
              };
              return (
                <PickersDay
                  {...DayComponentProps}
                  style={{ fontWeight: 700, fontSize: '14px' }}
                  sx={isSelected ? classes.selected : classes.notSelected}
                />
              );
            }}
          />
        </Wrapper>
      </LocalizationProvider>
    </div>
  );
};

export default Calendar;
