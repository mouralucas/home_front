// WithNav.js (Stand-alone Functional Component)
import React, {Suspense} from 'react';
import Header from '../Components/Header';
import {Outlet} from 'react-router-dom';
import {ProSidebarProvider} from "react-pro-sidebar";

const App = () => {
    return (
        <>
            <ProSidebarProvider>
                <Header/>
                <Suspense fallback={<h2>Loading...</h2>}>
                    <Outlet/>
                </Suspense>
            </ProSidebarProvider>
        </>
    );
};

export default App;