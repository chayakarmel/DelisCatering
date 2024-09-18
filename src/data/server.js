import Swal from 'sweetalert2'

import axios from "axios";
import dataStore from "./dataStore";


//שם משתמש וסיסמה
export async function CheckLogin(name, password) {
    try {
        const isValid = await axios.post("http://localhost:8000/api/user/:login", { name, password });
        if (isValid.status === 200) {
            Swal.fire({
                position: "center",
                icon: "success",
                title: "!נכנסת בהצלחה",
                showConfirmButton: false,
                timer: 1500
            })
            const { token } = isValid.data;
            localStorage.setItem('token', token); // שמירת הטוקן ב-localStorage
            console.log('Login successful:', isValid);
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
        const services = await axios.get('http://localhost:8000/api/product');
        dataStore.setServices(services.data);
        console.log("getServices", services.data);
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


// export const addProduct = (product,token) => {

//     return axios.post(`${baseUrl}product/`,product,{
//         headers: {
//                    "x-access-token": token
//                }
//     });
// }

// export async function addService(service, token) {

//     const res = await axios.post('http://localhost:8000/api/product/', service) 
  
//     if (res.status === 200) {
//         dataStore.addNewService(service);
//         console.log("addService", service)
//         console.log('success');
//     }
//     else {
//         console.log('failed');

//     }
// }
// export async function addService(service, token) {
//     try {
//         const res = await axios.post('http://localhost:8000/api/product', service, {
//             headers: {
//                 "Authorization": `Bearer ${token}`
//             }
//         });
        
//         if (res.status === 200) {
//             dataStore.addNewService(service);
//             console.log("addService", service);
//             console.log('success');
//         } else {
//             console.log('failed');
//         }
//     } catch (error) {
//         console.error('Error adding service:', error);
//     }
// }


export async function addService(service,token) {
    try {
        console.log(service);
        const res = await axios.post('http://localhost:8000/api/product/', service, { headers: {
                            "Authorization": `Bearer ${token}`
                        }})
        if (res.status === 200) {
            dataStore.addNewService(service);
            console.log("addService", service);
            console.log('success');
        } else {
            console.log('failed');
        }
    } catch (error) {
        console.error('Error adding service:', error.response ? error.response.data : error.message);
    }
}

//-------------------------------------------------------------------------------------

//שליפת פרטי העסק

export async function getBusinessData() {
    console.log("coming to getBusiness");
    try {
        const response = await axios.get('http://localhost:8000/api/BD/');
        dataStore.getBusinessDatas(response.data);

        return response.data;
    } catch (e) {
        if (e.response) {
            // שגיאה מהשרת
            console.error('Server responded with a status:', e.response.status);
            console.error('Response data:', e.response.data);
        } else if (e.request) {
            // לא קיבלת תגובה מהשרת
            console.error('No response received from server');
        } else {
            // בעיה אחרת
            console.error('Error in request setup:', e.message);
        }
    }
}

//הוספת פרטי עסק
export async function editBusinessData(id,businessData) {
  
    const res = await axios.put(  `http://localhost:8000/api/BD/${id}`, businessData);
    if (res.status === 200) {
        dataStore.setBusinessData(businessData);
        console.log('businessDats, success');
    }
    else {
        alert('failed');

    }
}

//-------------------------------------------------------------------------------------------

//שליפת הפגישות
export async function getAppointment() {
    console.log("coming to get appointment");
    try {
        const appointment = await axios.get('http://localhost:8000/api/order');

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
        const response = await fetch('http://localhost:8000/api/order', {
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
        else {
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

