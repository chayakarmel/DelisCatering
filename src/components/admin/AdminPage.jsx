
import { observer } from "mobx-react"
import Login from "./Login"
import AdminHome from "./AdminHome"
import dataStore from "../../data/dataStore"


const AdminPage = (observer(() => {

   


    return (
        <>
            {!dataStore.isLogin ?  <Login/>: <AdminHome/> }
        </>
    )
}))

export default AdminPage
