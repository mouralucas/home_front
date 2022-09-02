import 'bootstrap/dist/css/bootstrap.min.css';
import {Modal} from 'react-bootstrap';
import '../Assets/Core/Components/Modal.css'

const App = (props) => {
    return (
        <div className="App">
            <Modal show={props.showModal} size={props.size ?? null} onHide={props.hideModal} fullscreen={props.fullscreen ?? null}>
                <Modal.Header closeButton>
                    <Modal.Title>{props.title ?? 'Modal Title'}</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <p>{props.body}</p>
                </Modal.Body>

                <Modal.Footer>
                    <div className='row pr-2 pl-2 d-flex justify-content-between align-items-center flex-wrap w-100'>
                        <div className="col-xl-2 col-lg-2 col-md-12 col-sm-12 col-12 mt-1">
                            <div className="d-flex flex-nowrap">
                                <a className='btn btn-outline-secondary text-center w-100' onClick={props.hideModal}>Fechar</a>
                            </div>
                        </div>

                        <div className="col-xl-8 col-lg-8 col-md-12 col-sm-12 col-12 mt-1">
                        </div>

                        <div className="col-xl-2 col-lg-2 col-md-12 col-sm-12 col-12 mt-1">

                            <div className="d-flex flex-nowrap">
                                {/*<a href="" className="btn btn-default-hollow w-100">Outro</a>*/}
                                <a className='btn btn-default text-white text-center w-100 mr-1' onClick={props.actionModal ?? props.hideModal}>Salvar</a>
                            </div>
                        </div>
                    </div>

                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default App;