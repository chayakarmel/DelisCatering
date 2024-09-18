
import * as React from 'react';
import { Button, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

import { observer } from 'mobx-react';
import { addService } from '../../data/server';
import './service.css';

const AddService = (observer(() => {


    const [service, setService] = useState({ name: "", description: "", price: "", img: "" });

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // קבלת הטוקן (נניח מ-localStorage)
        const token = localStorage.getItem('token');

        if (token) {
            addService(service, token);
            setService({ name: "", description: "", price: "", img: "" });
            setOpen(false);
        } else {
            setOpen(false);
            alert("אינך מורשה לבצע פעולה זו");
            console.error('No token found');
        }
    };

    
    const handleClose = () => {
        setService({ name: "", description: "", price: "", img: "" });
        setOpen(false);
    };

    return (
        <>
            <div id="addService">
                <React.Fragment>
                    <Fab id='fab' variant="outlined" onClick={handleClickOpen}>
                        <AddIcon />
                    </Fab>

                    <Dialog
                        open={open}
                        onClose={handleClose}
                        PaperProps={{
                            component: 'form',
                            onSubmit: handleSubmit,
                        }}
                    >
                        <DialogTitle>הוספת שירות</DialogTitle>
                        <DialogContent>
                            <Box
                                component="form"
                                sx={{
                                    '& > :not(style)': { m: 1, width: '25ch' }, display: 'grid', columnGap: 3,
                                    rowGap: 0.1,
                                    gridTemplateColumns: 'repeat(1fr)',
                                }}
                                noValidate
                                autoComplete="off"
                            >
                                <TextField label="שם השירות" variant="outlined" value={service.name}
                                    onChange={(e) => setService({ ...service, name: e.target.value })} />

                                <TextField label="תיאור" variant="outlined" value={service.description}
                                    onChange={(e) => setService({ ...service, description: e.target.value })} />

                                <TextField label="מחיר למנה " variant="outlined" type="number" value={service.price}
                                    onChange={(e) => setService({ ...service, price: e.target.value })} />

                                <TextField label="קישור לתמונה " variant="outlined" value={service.img}
                                    onChange={(e) => setService({ ...service, img: e.target.value })} />
                            </Box>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose}>ביטול</Button>
                            <Button type="submit" >הוספה</Button>
                        </DialogActions>
                    </Dialog>

                </React.Fragment>
            </div>


        </>
    )
}))

export default AddService