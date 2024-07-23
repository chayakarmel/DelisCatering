
import { observer } from 'mobx-react'
import { Outlet, useNavigate } from 'react-router';
import React from 'react'
import BusinessData from '../businessData/BusinessData'
import AddService from '../services/AddService';
import EditBusinessData from '../businessData/EditBusinessData'
import './admin.css';



const AdminHome = (observer(() => {

 const navigate=useNavigate()

 
  return (
    <>



    
      <BusinessData />
    
      <div id="buttons">
        <button onClick={()=>navigate("ServicesList")}>שירותים</button>
        <button  onClick={()=>navigate("Appointments")}>פגישות</button>
        <AddService />
        <EditBusinessData/>
      </div>
      
      <Outlet/>
     
    
    </>
  )
}))
export default AdminHome