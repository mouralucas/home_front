import React from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Library from '../Pages/Library/Home';
import FinanceDashboard from '../Pages/Finance/Dashboard/Home'
import FinanceRecord from '../Pages/Finance/Record/Home'
import Files from '../Pages/FileManager/Home'
import Login from "../Pages/Login";
import Error404 from "../Pages/Errors/404";
import RequireAuth from "../Services/Auth/Auth";
import WithNav from "./WithNav";
import WithoutNav from "./WithoutNav";


function HomeRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<WithNav/>}>
                    <Route element={<RequireAuth><Library/></RequireAuth>} path="/library/home"/>
                    <Route element={<RequireAuth><FinanceDashboard/></RequireAuth>} path="/finance/dashboard"/>
                    <Route element={<RequireAuth><FinanceRecord/></RequireAuth>} path="/finance/records"/>
                    <Route element={<RequireAuth><Files/></RequireAuth>} path="/files"/>
                </Route>

                <Route element={<WithoutNav/>}>
                    <Route element={<Login/>} path=""/>
                    <Route path="*" element={<Error404/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    );

}

export default HomeRoutes;