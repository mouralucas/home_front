import React, {lazy } from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";

import Files from '../Pages/FileManager/Home'
import Uploader from '../Pages/FileManager/Uploader'
import Login from "../Pages/Login";
import LandingPage from "../Pages/LandingPage";
import Error404 from "../Pages/Errors/404";
import RequireAuth from "../Services/Auth/Auth";
import WithNav from "./WithNav";
import WithoutNav from "./WithoutNav";

const Library = lazy(() => import('../Pages/Library/Records/Home'))
const LibraryRecord = lazy(() => import('../Pages/Library/Backlog/Home'))
const FinanceDashboard = lazy(() => import('../Pages/Finance/Dashboard/Home'))
const FinanceRecord = lazy(() => import('../Pages/Finance/Record/Home'))
const Investment = lazy(() => import('../Pages/Finance/Investment/Home'))


function HomeRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<WithNav/>}>
                    {/*Library routes */}
                    <Route element={<RequireAuth><Library/></RequireAuth>} path="/library/home"/>
                    <Route element={<RequireAuth><LibraryRecord/></RequireAuth>} path="/library/backlog"/>
                    {/*Finance routes*/}
                    <Route element={<RequireAuth><FinanceDashboard/></RequireAuth>} path="/finance/dashboard"/>
                    <Route element={<RequireAuth><FinanceRecord/></RequireAuth>} path="/finance/records"/>
                    <Route element={<RequireAuth><Investment/></RequireAuth>} path="/finance/investment"/>
                    {/*Other routes*/}
                    <Route element={<RequireAuth><Files/></RequireAuth>} path="/files"/>
                    <Route element={<RequireAuth><Uploader/></RequireAuth>} path="/files/upload"/>
                </Route>

                <Route element={<WithoutNav/>}>
                    <Route element={<LandingPage/>} path=""/>
                    <Route element={<Login/>} path="/login"/>
                    <Route path="*" element={<Error404/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    );

}

export default HomeRoutes;