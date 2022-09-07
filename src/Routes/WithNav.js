// WithNav.js (Stand-alone Functional Component)
import React from 'react';
import NavBar from '../Components/Navbar';
import { Outlet } from 'react-router-dom';

export default () => {
    return (
        <>
            <NavBar />
            <Outlet />
        </>
    );
};