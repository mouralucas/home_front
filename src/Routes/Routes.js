import React from "react";
import {Routes, Route, BrowserRouter} from "react-router-dom";
import Home from '../Pages/Library/Home'
import Login from "../Pages/Login";

function HomeRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Home />} path="/library/home"   />
                <Route element={<Login />} path="" />
            </Routes>
        </BrowserRouter>
    );
}

export default HomeRoutes;