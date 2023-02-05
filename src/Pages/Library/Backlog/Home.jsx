import Sidebar from '../../../Components/Sidebar/Base';
import AuthorTable from "./Tables/Author";
import React from "react";
import Card from '../../../Components/Card'
import SerieTable from '../Backlog/Tables/Serie'
import PublisherTable from '../Backlog/Tables/Publisher'
import CollectionTable from '../Backlog/Tables/Collection'


// Sidebar documentation:
// https://github.com/azouaoui-med/react-pro-sidebar
const App = () => {
    return (
        <>
            <div style={{display: 'flex', height: '100%'}}>
                <Sidebar/>
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
                    <div className="row">
                        <div className="col-12">
                            <Card>
                                <Card.Header>
                                    <div className="col-6">Editoras</div>
                                    <div className="col-4"></div>
                                    <div className="col-2">
                                    </div>
                                </Card.Header>
                                <Card.Body>
                                    <PublisherTable/>
                                </Card.Body>
                            </Card>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <Card>
                                <Card.Header>
                                    <div className="col-6">Séries</div>
                                    <div className="col-4"></div>
                                    <div className="col-2">
                                    </div>
                                </Card.Header>
                                <Card.Body>
                                    <SerieTable/>
                                </Card.Body>
                            </Card>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <Card>
                                <Card.Header>
                                    <div className="col-6">Coleções</div>
                                    <div className="col-4"></div>
                                    <div className="col-2">
                                    </div>
                                </Card.Header>
                                <Card.Body>
                                    <CollectionTable/>
                                </Card.Body>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default App;