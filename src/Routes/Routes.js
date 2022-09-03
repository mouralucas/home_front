import React from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Library from '../Pages/Library/Home';
import Finance from '../Pages/Finance/Dashboard/Home'
import Login from "../Pages/Login";
import Error404 from "../Pages/Errors/404";
import RequireAuth from "../Services/Auth/Auth";
import Navbar from "../Components/Navbar";


function HomeRoutes() {
    return (
        <BrowserRouter>
            <Navbar/>
            <Routes>
                <Route element={<RequireAuth><Library /></RequireAuth>} path="/library/home"   />
                <Route element={<RequireAuth><Finance /></RequireAuth>} path="/finance/home"   />
                <Route element={<Login />} path="" />
                <Route path="*" element={<Error404 />} />
            </Routes>
        </BrowserRouter>
    );
}

export default HomeRoutes;