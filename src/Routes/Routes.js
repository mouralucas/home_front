import React from "react";
import {Routes, Route, BrowserRouter} from "react-router-dom";
import Home from '../Pages/Library/Home'

function HomeRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Home />} path=""   />
            </Routes>
        </BrowserRouter>
    );
}

export default HomeRoutes;