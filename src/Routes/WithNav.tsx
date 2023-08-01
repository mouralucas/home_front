// WithNav.js (Stand-alone Functional Component)
import React, {Suspense} from 'react';
import Header from '../Components/Header';
import {Outlet} from 'react-router-dom';
import {ProSidebarProvider} from "react-pro-sidebar";
import Footer from "../Components/Footer";

const App = () => {
    return (
        <>
            <ProSidebarProvider>
                <Header/>
                <Suspense fallback={<h2>Loading...</h2>}>
                    <Outlet/>
                </Suspense>
                <Footer/>
            </ProSidebarProvider>
        </>
    );
};

export default App;