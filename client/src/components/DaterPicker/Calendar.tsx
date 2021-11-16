/* eslint-disable react/prop-types */
/* eslint-disable operator-linebreak */
// @ts-nocheck
import * as React from 'react';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import CalendarPicker from '@mui/lab/CalendarPicker';
import { CalendarPickerSkeleton, PickersDay } from '@mui/lab';
import { styled } from '@mui/material/styles';

const Wrapper = styled('div')`
  color: white;
  div[role='presentation'] {
    pointer-events: none;
  }
  button[aria-label='calendar view is open, switch to year view'] {
    display: none;
  }
  .Mui-selected {
    background-color: #7e74e7 !important;
    font-weight: 800 !important;
    color: white !important;
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

  const StyledPickersDay = styled(PickersDay)`
    background: transparent;
    font-weight: 800;
    font-size: 16px;
    color: ${(props) => (props.validDay ? '#cdc8ff' : 'white')};
    opacity: ${(props) => (props.validDay ? 1 : 0.3)};
    background: ${(props) => (props.validDay ? '' : 'transparent')};
    border: ${(props) => (props.validDay ? '2px solid #7e74e7b0' : '')};
  `;

  return (
    <div style={{ backgroundColor: '#292727' }}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Wrapper>
          <CalendarPicker
            date={date}
            minDate={minDate}
            maxDate={maxDate}
            onChange={(e) => {
              console.log(e);
              console.log(typeof e);
              setDate(e);
            }}
            renderLoading={() => <CalendarPickerSkeleton />}
            renderDay={(day, _value, DayComponentProps) => {
              const isSelected =
                !DayComponentProps.outsideCurrentMonth &&
                highlightedDays.indexOf(day.getDate()) >= 0;
              DayComponentProps = {
                ...DayComponentProps,
                disabled: !isSelected,
              };
              // @ts-ignore
              return (
                <StyledPickersDay
                  {...DayComponentProps}
                  validDay={isSelected}
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
