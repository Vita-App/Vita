import * as React from 'react';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import CalendarPicker from '@mui/lab/CalendarPicker';
import MonthPicker from '@mui/lab/MonthPicker';
import YearPicker from '@mui/lab/YearPicker';
import Grid from '@mui/material/Grid';

const minDate = new Date('2020-01-01T00:00:00.000');
const maxDate = new Date('2034-01-01T00:00:00.000');

const SubComponentsPickers = () => {
  const [date, setDate] = React.useState<Date | null>(new Date());

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <CalendarPicker
            date={date}
            onChange={(newDate) => setDate(newDate)}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <MonthPicker
            date={date}
            minDate={minDate}
            maxDate={maxDate}
            onChange={(newDate) => setDate(newDate)}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <YearPicker
            date={date}
            isDateDisabled={() => false}
            minDate={minDate}
            maxDate={maxDate}
            onChange={(newDate) => setDate(newDate)}
          />
        </Grid>
      </Grid>
    </LocalizationProvider>
  );
};

export default SubComponentsPickers;

// Import React, { useState } from 'react';
// import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
// import DateFnsUtils from '@date-io/date-fns';

// const StaticDatePicker = () => {
//   const todaysDate = new Date();
//   const [date, changeDate] = useState<Date | null>(todaysDate);

//   return (
//     <>
//       <MuiPickersUtilsProvider utils={DateFnsUtils}>
//         <DatePicker
//           autoOk
//           variant="static"
//           openTo="year"
//           value={date}
//           onChange={(date) => changeDate(date)}
//         />

//         <DatePicker
//           autoOk
//           orientation="landscape"
//           variant="static"
//           openTo="date"
//           value={date}
//           onChange={changeDate}
//         />
//       </MuiPickersUtilsProvider>
//     </>
//   );
// };

// export default StaticDatePicker;
