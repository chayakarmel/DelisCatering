
import * as React from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import { observer } from 'mobx-react';
import './Appointment.css'

const InputDate = (observer(({ setSelectedDate }) => {
  return (
    <>
      <div id='input'>
        
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={['DatePicker']}>
            <DatePicker onChange={(e) => { console.log(new Date(e)?.toLocaleDateString()); setSelectedDate(e) }} />
          </DemoContainer>
        </LocalizationProvider>
      </div>
    </>

  );

}))
export default InputDate