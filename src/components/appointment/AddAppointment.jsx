
import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import Swal from 'sweetalert2';

import { observer } from 'mobx-react';
import { useState } from 'react';
import { addAppointment } from '../../data/server'
import BasicDatePicker from './Date';
import KindOfServices from './KindOfServices';
import dataStore from '../../data/dataStore';
import './Appointment.css'

const AddAppointment = (observer(() => {

    //לפרטי ההזמנה
    const [appointment, setAppointment] = useState({ service: "", qty: "", date: "", name: "", email: "", phone: "" });
    const [open, setOpen] = React.useState(false);

    //לפתיחת הדיאלוג
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    }



    //לסגירת הדיילוג
    const handleSubmit = async () => {
        // שימי לב שכאן השינויים
        if (appointment.service != "" && appointment.qty != 0 && appointment.date != "" && appointment.name != "" && appointment.email != "" && appointment.phone != "") {
          await addAppointment(appointment);
            if (dataStore.isAppointment === true) {
                setAppointment({ service: "", qty: 0, date: "", name: "", email: "", phone: "" });
                console.log("success");
                setOpen(false);
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "נרשמת בהצלחה!",
                    showConfirmButton: false,
                    timer: 1500
                });


            }
            if (dataStore.isAppointment === false) {
                console.log("error appointment");
                setOpen(false);
                Swal.fire({
                    position: "center",
                    icon: "error",
                    title: "Oops...",
                    text: "מתנצלים אין מקום פנוי",
                });

            }

            setAppointment({ service: "", qty: 0, date: "", name: "", email: "", phone: "" });
        }

    }


    return (
        <React.Fragment>

            <button variant="outlined" onClick={handleClickOpen}>
                הזמנת ארוע
            </button>
            <Dialog
                open={open}
                onClose={handleClose}
                PaperProps={{
                    component: 'form',
                    onSubmit: (event) => {
                        event.preventDefault();
                        const formData = new FormData(event.currentTarget);
                        const formJson = Object.fromEntries(formData.entries());
                        const email = formJson.email;
                        console.log(email);
                        handleClose();
                    },
                }}
            >

                <DialogTitle>הזמנת ארוע</DialogTitle>
                <DialogContent>

                    <Box
                        // component="form"
                        sx={{
                            '& > :not(style)': { m: 3, width: '40ch' }, display: 'grid', columnGap: 3,
                            rowGap: 0.1,
                            gridTemplateColumns: 'repeat(1fr)',
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        <KindOfServices setAppointment={setAppointment} appointment={appointment} />



                        <BasicDatePicker setAppointment={setAppointment} appointment={appointment} ></BasicDatePicker>
                        
                        <TextField
                            autoFocus
                            required
                            type='number'
                            label="כמות "
                            variant="outlined"
                            value={appointment.qty}                      
                            onChange={(e) => {
                                setAppointment({ ...appointment, qty: e.target.value })
                                console.log(e.target.value)
                            }} />
                        <TextField
                            autoFocus
                            required
                            margin="dense"
                            id="name"
                            name="email"
                            label="שם"
                            type="text"
                            fullWidth
                            variant="outlined"
                            value={appointment.name}
                            onChange={({ target }) => setAppointment({ ...appointment, name: target.value })}
                        />
                        <TextField
                            autoFocus
                            required
                            margin="dense"
                            id="name"
                            name="email"
                            label="מייל"
                            type="email"
                            fullWidth
                            variant="outlined"
                            value={appointment.email}
                            onChange={({ target }) => setAppointment({ ...appointment, email: target.value })}
                        />
                        <TextField
                            label="טלפון "
                            type='phone'
                            autoFocus
                            required
                            variant="outlined"
                            value={appointment.phone}
                            onChange={(e) => setAppointment({ ...appointment, phone: e.target.value })} />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>ביטול </Button>
                    <Button type="submit" onClick={handleSubmit}>שמירה</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}))
export default AddAppointment

