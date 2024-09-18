
import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import EditIcon from '@mui/icons-material/Edit';

import { observer } from 'mobx-react'
import { useState } from 'react';
import { editBusinessData } from '../../data/server';
import dataStore from '../../data/dataStore'
import './business.css';




const EditBusinessData = (observer(() => {

    

    const [BD, setBD] = useState(dataStore.businessDatas);


    const [open, setOpen] = React.useState(false);


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(BD,"העסק החדש")
        editBusinessData(BD._id,BD);
        setOpen(false);
        
    }

    const handleClose = () => {
        setOpen(false);
    };
   
    
        
    return (
        <>
            <div id="edit">
                <React.Fragment>
                    <Fab id='fab' variant="outlined" onClick={handleClickOpen}>
                        <EditIcon />
                    </Fab>
                    <Dialog
                        open={open}
                        onClose={handleClose}
                        PaperProps={{
                            component: 'form',
                            onSubmit: handleSubmit,
                        }}
                    >
                        <DialogTitle>עדכון פרטי העסק</DialogTitle>
                        <DialogContent>
                            <Box
                                // component="form"
                                sx={{
                                    '& > :not(style)': { m: 2, width: '40ch' }, display: 'grid', columnGap: 3,
                                    rowGap: 0.1,
                                    gridTemplateColumns: 'repeat(1fr)',
                                }}
                                noValidate
                                autoComplete="off"
                            >

                                <TextField label="שם העסק" variant="outlined" value={BD.businessName}
                                    onChange={(e) => setBD({ ...BD, businessName: e.target.value })} />

                                <TextField label="קישור ללוגו" variant="outlined" value={BD.logo}
                                    onChange={(e) => setBD({ ...BD, logo: e.target.value })} />

                                <TextField label="כתובת" variant="outlined" value={BD.address}
                                    onChange={(e) => setBD({ ...BD, address: e.target.value })} />

                                <TextField label="טלפון" variant="outlined" value={BD.phone}
                                    onChange={(e) => setBD({ ...BD, phone: e.target.value })} />

                                <TextField label="תמונה" variant="outlined" value={BD.img}
                                    onChange={(e) => setBD({ ...BD, img: e.target.value })} />

                     
                            </Box>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose}>ביטול</Button>
                            <Button type="submit" >שמירה</Button>
                        </DialogActions>
                    </Dialog>

                </React.Fragment>
            </div>
        </>
    );
}))
export default EditBusinessData