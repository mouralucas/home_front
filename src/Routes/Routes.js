import React from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from '../Pages/Library/Home';
import Login from "../Pages/Login";
import Error404 from "../Pages/Errors/404";
import RequireAuth from "./ProtectedRoutes";


function HomeRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<RequireAuth><Home /></RequireAuth>} path="/library/home"   />
                <Route element={<Login />} path="" />
                <Route path="*" element={<Error404 />} />
            </Routes>
        </BrowserRouter>
    );
}

export default HomeRoutes;