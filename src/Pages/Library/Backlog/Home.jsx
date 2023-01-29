import Sidebar from '../../../Components/Sidebar/Base';
import AuthorTable from "./Tables/Author";
import React from "react";
import Card from '../../../Components/Card'


// Sidebar documentation:
// https://github.com/azouaoui-med/react-pro-sidebar
const App = () => {
    return (
        <>
            <Sidebar/>
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
        </>
    )
}

export default App;