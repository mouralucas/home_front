import Card from "../../../Components/Card";
import AuthorTable from './Tables/Author'
import PublisherTable from './Tables/Publisher'
import SerieTable from './Tables/Serie'
import CollectionTable from './Tables/Collection'

const App = () => {
    return (
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

    )
}

export default App;