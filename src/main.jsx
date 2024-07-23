
import * as React from 'react';
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router'
import { createBrowserRouter } from 'react-router-dom'

import ServicesList from './components/services/ServicesList'
import AdminPage from './components/admin/AdminPage'
import AppointmentList from './components/appointment/AppointmentList'
import EditBusinessData from './components/businessData/EditBusinessData'
import App from './App'
import './index.css'


const router = createBrowserRouter([{
  path: '',
  element: <App />,
  errorElement: <div>Error</div>,
}
  , {
  path: '/Admin',
  element: <AdminPage />,
  children: [
    {
      path: 'ServicesList',
      element: <ServicesList />,
    }
    , {
      path: 'Appointments',
      element: <AppointmentList />,
    },
    {
      path: 'EditBusinessData',
      element: <EditBusinessData />,
    }
  ]
}


]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
