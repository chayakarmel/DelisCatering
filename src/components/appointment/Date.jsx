
import * as React from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';



 function BasicDatePicker({ setAppointment, appointment }) {

  const handleDateTime = (dateTime) => {
    const dateTimef = dateTime.format('YYYY-MM-DDTHH:mm:ss');
    setAppointment({ ...appointment,date: dateTimef })

  }


  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DatePicker']}>
        <DatePicker   onChange={(e) => { console.log(e.$d); handleDateTime(e) }}  disablePast required />
      </DemoContainer>
    </LocalizationProvider>
  );
}
export default BasicDatePicker





  


