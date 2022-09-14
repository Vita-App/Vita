/* eslint-disable react/prop-types */
// @ts-nocheck
import React, { useState } from 'react';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import CalendarPicker from '@mui/lab/CalendarPicker';
import { CalendarPickerSkeleton, PickersDay } from '@mui/lab';
import { styled } from '@mui/material/styles';
import { mentorState, timeZoneState } from 'store';
import { useRecoilState, useRecoilValue } from 'recoil';
import { DurationType } from 'types';
import { getSlotsByDays } from 'utils/helper';
import { Stack, Typography } from '@mui/material';
import moment from 'moment-timezone';
import { StyledReactSelect } from 'components/common';
import { useQuery } from 'react-query';
import axios from 'axios';
import { SERVER_URL } from 'config.keys';
import Select_TEMP from './Select_temp';

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
  setTimeslot: React.Dispatch<React.SetStateAction<DurationType[]>>;
  setSelectedSlot: React.Dispatch<
    React.SetStateAction<DurationType | undefined>
  >;
}

const checkValidDate = (todaysDate: Date, date: Date) => {
  if (todaysDate.getMonth() < date.getMonth()) return true;

  if (todaysDate.getDate() > date.getDate()) return false;
  return true;
};

const getBusySlots = async (id: string) => {
  const { data } = await axios.get<Date[]>(`${SERVER_URL}/api/busySlots`, {
    params: { id },
  });

  return data;
};

const Calendar: React.FC<CalendarProps> = ({
  date,
  setDate,
  setTimeslot,
  setSelectedSlot,
}) => {
  const [month, setMonth] = useState(new Date().getMonth());
  const { time_slots: _time_slots, _id } = useRecoilValue(mentorState);
  const { isLoading, data: busySlots } = useQuery(['getBusySlots', _id], () =>
    getBusySlots(_id),
  );
  const [timeZone, setTimeZone] = useRecoilState(timeZoneState);
  const todaysDate = new Date();
  const minDate = new Date(todaysDate.getFullYear(), todaysDate.getMonth(), 1);
  const maxDate = new Date(
    todaysDate.getFullYear(),
    todaysDate.getMonth() + 2,
    0,
  );

  if (isLoading) return null;

  const time_slots = getSlotsByDays(
    _time_slots,
    busySlots,
    month,
    timeZone.value,
  );

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
        <Stack spacing={2}>
          <StyledReactSelect
            value={timeZone}
            placeholder={<div>Change TimeZone</div>}
            onChange={(e: any) => {
              if (e.value !== timeZone.value) {
                setDate(null);
                setTimeslot([]);
                setSelectedSlot(undefined);
              }

              setTimeZone(e);
            }}
            classNamePrefix="select"
            options={moment.tz
              .names()
              .map((name) => ({ value: name, label: name }))}
          />
          <Typography variant="subtitle1" px={2} mb={1}>
            Your default timezone is{' '}
            <Typography component="span" color="Highlight">
              {moment.tz.guess()}
            </Typography>
          </Typography>
        </Stack>
        <Wrapper>
          <CalendarPicker
            date={date}
            minDate={minDate}
            maxDate={maxDate}
            onMonthChange={(e) => {
              setMonth(e.getMonth());
            }}
            onChange={(e) => {
              // if (typeof e === 'undefined') return;
              setDate(e);
              setTimeslot(time_slots[e?.getDate()]);
            }}
            renderLoading={() => <CalendarPickerSkeleton />}
            renderDay={(day, _value, DayComponentProps) => {
              const available = time_slots[day.getDate()]?.length > 0;
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
