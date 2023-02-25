import {Menu, MenuItem, Sidebar, sidebarClasses, SubMenu} from "react-pro-sidebar";
import {BarChart} from "../../Assets/Core/Images/icons/BarChart";
import {Badge} from "react-bootstrap";
import {SidebarFooter} from "../../Assets/Core/Components/Sidebar/Footer";
import AuthorTable from "../../Pages/Library/Backlog/Tables/Author";
import React from "react";
import Card from '../../Components/Card'
import {Link} from "react-router-dom";


const App = (props) => {


    return (
        <>
            <Sidebar defaultCollapsed={true}
                     transitionDuration={2000}>
                <Menu>
                    <SubMenu
                        label={"Fianceiro"}
                        icon={<BarChart/>}
                        component={<Link to="/finance/dashboard" />}
                        active={true}
                    >
                        <MenuItem component={<Link to="/finance/dashboard" />}>Dashboard</MenuItem>
                        <MenuItem component={<Link to="/finance/records" />}>Registros</MenuItem>
                    </SubMenu>
                    <SubMenu
                        label={"Biblioteca"}
                        icon={<BarChart/>}>
                        <MenuItem component={<Link to="/library/home" />}>Home</MenuItem>
                        <MenuItem component={<Link to="/library/backlog" />}>Backlog</MenuItem>
                    </SubMenu>
                    <SubMenu
                        label="Charts"
                        icon={<BarChart/>}
                        suffix={
                            <Badge>
                                6
                            </Badge>
                        }>
                        <MenuItem> Pie charts </MenuItem>
                        <MenuItem> Line charts </MenuItem>
                    </SubMenu>
                </Menu>
                <SidebarFooter collapsed={true}/>
            </Sidebar>

        </>
    );
}

export default App;