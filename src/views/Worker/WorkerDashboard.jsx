import React from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from "../../services/authenticationService";
import Sidebar from '../../components/Sidebar';
import { Outlet } from 'react-router-dom';

const WorkerDashboard = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        logout(navigate); // performs logout and redirects
    };

  return (
    <>
    <Sidebar/>
    <Outlet />
    </>
  )
}

export default WorkerDashboard