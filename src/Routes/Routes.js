import React from "react";
import {Routes, Route, BrowserRouter, Redirect} from "react-router-dom";
import Home from '../Pages/Library/Home';
import Login from "../Pages/Login";
import Error404 from "../Pages/Errors/404";


function HomeRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Home />} path="/library/home"   />
                <Route element={<Login />} path="" />
                <Route path="*" element={<Error404 />} />
            </Routes>
        </BrowserRouter>
    );
}

export default HomeRoutes;