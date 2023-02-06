import {Menu, MenuItem, Sidebar, sidebarClasses, SubMenu} from "react-pro-sidebar";
import {BarChart} from "../../Assets/Core/Images/icons/BarChart";
import {Badge} from "react-bootstrap";
import {SidebarFooter} from "../../Assets/Core/Components/Sidebar/Footer";
import AuthorTable from "../../Pages/Library/Backlog/Tables/Author";
import React from "react";
import Card from '../../Components/Card'


const App = () => {
    return (
        <>
            <Sidebar defaultCollapsed={true}
                     transitionDuration={2000}>
                <Menu
                    rootStyles={{
                        [`.${sidebarClasses.container}`]: {
                            backgroundColor: 'red',
                        },
                    }}
                >
                    <MenuItem icon={<BarChart/>}>
                        Item
                    </MenuItem>
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