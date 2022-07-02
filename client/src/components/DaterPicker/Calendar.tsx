/* eslint-disable react/prop-types */
// @ts-nocheck
import * as React from 'react';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import CalendarPicker from '@mui/lab/CalendarPicker';
import { CalendarPickerSkeleton, PickersDay } from '@mui/lab';
import { styled } from '@mui/material/styles';
import { mentorState } from 'store';
import { useRecoilValue } from 'recoil';
import { DayEnumType } from 'types';
import { range } from 'utils/helper';

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

const dayOfWeek: DayEnumType[] = [
  'sunday',
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
];

interface CalendarProps {
  date: Date | null;
  setDate: React.Dispatch<React.SetStateAction<Date | null>>;
  setTimeslot: React.Dispatch<React.SetStateAction<number[]>>;
}

const checkValidDate = (todaysDate: Date, date: Date) => {
  if (todaysDate.getMonth() < date.getMonth()) return true;

  if (todaysDate.getDate() > date.getDate()) return false;
  return true;
};

const Calendar: React.FC<CalendarProps> = ({ date, setDate, setTimeslot }) => {
  const todaysDate = new Date();
  const minDate = new Date(todaysDate.getFullYear(), todaysDate.getMonth(), 1);
  const maxDate = new Date(
    todaysDate.getFullYear(),
    todaysDate.getMonth() + 2,
    0,
  );
  const { time_slots } = useRecoilValue(mentorState);

  console.log(time_slots);

  const StyledPickersDay = styled(PickersDay)`
    background: transparent;
    font-weight: 800;
    font-size: 16px;
    color: ${(props) => (props.validday === 'true' ? '#cdc8ff' : 'white')};
    opacity: ${(props) => (props.validday === 'true' ? 1 : 0.3)};
    background: ${(props) => (props.validday === 'true' ? '' : 'transparent')};
    border: ${(props) =>
      props.validday === 'true' ? '2px solid #7e74e7b0' : ''};
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
              // if (typeof e === 'undefined') return;
              const dayName: DayEnumType = dayOfWeek[e.getDay()];
              const { start_hour, end_hour } = time_slots[dayName];
              setDate(e);
              setTimeslot(range(start_hour, end_hour, 1));
            }}
            renderLoading={() => <CalendarPickerSkeleton />}
            renderDay={(day, _value, DayComponentProps) => {
              const dayName: DayEnumType = dayOfWeek[day.getDay()];

              const { available } = time_slots[dayName];
              const isSelected =
                !DayComponentProps.outsideCurrentMonth &&
                available &&
                checkValidDate(todaysDate, day);

              DayComponentProps = {
                ...DayComponentProps,
                disabled: !isSelected,
              };
              // @ts-ignore
              return (
                <StyledPickersDay
                  {...DayComponentProps}
                  validday={isSelected?.toString()}
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
