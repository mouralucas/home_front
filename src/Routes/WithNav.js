// WithNav.js (Stand-alone Functional Component)
import React from 'react';
import NavBar from '../Components/Navbar';
import {Outlet} from 'react-router-dom';
import {ProSidebarProvider} from "react-pro-sidebar";

const App = () => {
    return (
        <>
            <ProSidebarProvider>
                <NavBar/>
                <Outlet/>
            </ProSidebarProvider>
        </>
    );
};

export default App;