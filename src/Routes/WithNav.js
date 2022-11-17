// WithNav.js (Stand-alone Functional Component)
import React from 'react';
import NavBar from '../Components/Navbar';
import { Outlet } from 'react-router-dom';

const App = () => {
    return (
        <>
            <NavBar />
            <Outlet />
        </>
    );
};

export default App;