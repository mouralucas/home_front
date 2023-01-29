import Card from "../../../Components/Card";
import AuthorTable from './Tables/Author'
import PublisherTable from './Tables/Publisher'
import SerieTable from './Tables/Serie'
import CollectionTable from './Tables/Collection'
import {Sidebar, Menu, MenuItem, useProSidebar, SubMenu, sidebarClasses} from 'react-pro-sidebar';
import {Badge} from "react-bootstrap";
import {BarChart} from "../../../Assets/Core/Images/icons/BarChart";
import {SidebarFooter} from "../../../Assets/Core/Components/Sidebar/Footer";


// Sidebar documentation:
// https://github.com/azouaoui-med/react-pro-sidebar
const App = () => {
    return (
        <>
            <div style={{display: 'flex', height: '100%'}}>
                <Sidebar defaultCollapsed={true}
                         transitionDuration={2000}>
                    <Menu
                        rootStyles={{
                            [`.${sidebarClasses.container}`]: {
                                backgroundColor: 'red',
                            },
                        }}
                    >
                        <MenuItem
                            icon={<BarChart/>}
                        >Item</MenuItem>
                        <SubMenu
                            label="Charts"
                            icon={<BarChart/>}
                            suffix={
                                <Badge variant="danger" shape="square">
                                    6
                                </Badge>
                            }>
                            <MenuItem> Pie charts </MenuItem>
                            <MenuItem> Line charts </MenuItem>
                        </SubMenu>
                    </Menu>
                    <SidebarFooter collapsed={true}/>
                </Sidebar>
                <main>
                    <div className='App'>
                        <div className="row">
                            <div className="col-12">
                                <Card>
                                    <Card.Header>
                                        <div className="col-6">Autores</div>
                                        <div className="col-4"></div>
                                        <div className="col-2">
                                        </div>
                                    </Card.Header>
                                    <Card.Body>
                                        <AuthorTable/>
                                    </Card.Body>
                                </Card>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </>
    )
}

export default App;