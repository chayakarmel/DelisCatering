
import React from 'react'
import './Appointment.css'


const Appointment = ({ appointment }) => {
  let color = 'later';

  if (
    new Date(appointment.date).setHours(0, 0, 0, 0) == new Date().setHours(0, 0, 0, 0)) {
    color = 'today';
    
  }
  else if (

    new Date(appointment.date) < new Date().setDate(new Date().getDate() + 7)) {
    color = 'thisWeek';

    
  }

  return (
    <>
      
        <div className='appointment' >
          <p id={`${color}`}>{new Date(appointment.date)?.toLocaleDateString()}</p>
          <p>{appointment.service}</p>
          <p>מספר מנות :{appointment.qty}</p>
          <p> {appointment.name}</p>
          <p> {appointment.email}</p>
          <p> {appointment.phone}</p>
        </div>
     
    </>

  )
}

export default Appointment
