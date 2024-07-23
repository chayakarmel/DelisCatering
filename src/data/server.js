import Swal from 'sweetalert2'

import axios from "axios";
import dataStore from "./dataStore";


//שם משתמש וסיסמה
export async function CheckLogin(name, password) {
    try {
        const isValid = await axios.post("http://localhost:8787/login", { name, password });
        if (isValid.status === 200) {
            Swal.fire({
                position: "center",
                icon: "success",
                title: "!נכנסת בהצלחה",
                showConfirmButton: false,
                timer: 1500
              })
            dataStore.setIsLogin(true);

        }
    }
    catch (e) {
            
            Swal.fire({
                icon: "error",
                title: "טעות!",
                text: "שם משתמש וסיסמא אינם נכונים",
            });
        // }
    }
}

//-------------------------------------------------------------------------------------
//קבלת  השרותים 

export async function getServices() {
    console.log("coming to server")
    try {
        const services = await axios.get('http://localhost:8787/services');
        dataStore.setServices(services.data);
        console.log("getServices", services);
        if (services.status == 400)
            alert("exists")
    }
    catch (e) {
        if (e.response) {
            console.log('The services are not found');
        }
        else {
            console.log('server failed');
        }
    }
}

//הוספת שרות 
export async function addService(service) {

    const res = await axios.post('http://localhost:8787/service', service);
    if (res.status === 200) {
        dataStore.addNewService(service);
        console.log("addService", service)
        console.log('success');
    }
    else {
        console.log('failed');

    }
}
//-------------------------------------------------------------------------------------

//שליפת פרטי העסק
export async function getBusinessData() {
    console.log("coming to getBusiness")
    try {
        const businessData = await axios.get('http://localhost:8787/businessData');
        dataStore.setBusinessData(businessData.data);
        console.log("businessData-server", businessData);
        return;

    }
    catch (e) {
        if (e.response) {
            console.log('The businessData are not found');
        }
        else {
            console.log('server failed');
        }
    }
}

//הוספת פרטי עסק
export async function addBusinessData(businessData) {

    const res = await axios.post('http://localhost:8787/businessData', businessData);
    if (res.status === 200) {
        dataStore.setBusinessData(businessData);
        console.log('businessDats, success');
    }
    else {
        console.log('failed');

    }
}

//-------------------------------------------------------------------------------------------

//שליפת הפגישות
export async function getAppointment() {
    console.log("coming to get appointment");
    try {
        const appointment = await axios.get('http://localhost:8787/appointments');
        
        const sortedData = [...appointment.data].sort((a, b) => new Date(a.date) - new Date(b.date));
       dataStore.setAppointment(sortedData);
        console.log('success');

    }
    catch (e) {
        if (e.response) {
        console.log('The appointments are not found');
        }
        else {
            console.log('server failed');
        }
    }
}




//הוספת פגישה

export async function addAppointment(appointment) {
  
    try {
      const response = await fetch('http://localhost:8787/appointment', {
        method: 'post',
        body: JSON.stringify(appointment),
        headers: {
          "Content-Type": "application/json"
        }
      })
      if (response.status === 200) {
        console.log("good")
         dataStore.addNewAppointment(appointment);
         dataStore.checkAppointment(true);
      }
      else{
      console.log("theError");
        // throw new Error();
        dataStore.checkAppointment(false);
     
      }
    }
    catch (error) {
      console.log(error, "error")
      dataStore.checkAppointment(false);
;      
    }
  }
  
