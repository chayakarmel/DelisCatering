
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import { observer } from 'mobx-react';
import React from 'react'
import { useEffect } from 'react';
import dataStore from '../../data/dataStore';
import { getServices } from '../../data/server';

const KindOfServices = (observer(({ setAppointment, appointment }) => {
    useEffect(() => {
        if (dataStore.services.length) {
            getServices()
        }

    }, [])
    //לסוג האטרקציה-select
    const [serviceKind, setserviceKind] = React.useState('');


    //לקליטת האטרקציה 
    const handleChange = (event) => {
        setserviceKind(event.target.value);
        setAppointment({ ...appointment, service: event.target.value })
       
    };
    const kindsOfServices = [];
    

    dataStore.services.forEach((s) => {
        if (!kindsOfServices.includes(s.name))
            kindsOfServices.push(s.name)
    })


    return (
        <>
            <FormControl sx={{ m: 1, minWidth: 120 }} size="medium">
                <InputLabel id="demo-select-small-label">סוג ההזמנה</InputLabel>
                <Select
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    value={serviceKind}
                    label="serviceKind"
                    onChange={handleChange}
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    {console.log("-----------------" + kindsOfServices.length)}
                    {kindsOfServices.map((s, i) => <MenuItem key={i} value={s}>{s}</MenuItem>)}
                    
                </Select>
            </FormControl>
        </>
    )
}))
export default KindOfServices