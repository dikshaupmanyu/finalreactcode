import React from 'react';
import Sidebar from "./Sidebar/Sidebar";
import Topbar from "./topbar/Topbar";
import Homes from './pages/Home/Home';
import UserList from './pages/userList/UserList';
import { Outlet } from "react-router-dom";

const Admin = () => {
  return (
    <>
    <Topbar />
    <div className='container-4'>
    <Sidebar/>
    <Homes/>
    </div>
    </>
  )
}

export default Admin
