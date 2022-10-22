import Card from "../../../Components/Card";
import AuthorTable from './Tables/Author'

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
        </div>
    )
}

export default App;