import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react'
import {Modal} from 'react-bootstrap';
import '../Assets/Core/Components/Modal.css'


interface ModalProps {
    // Add defaults no parâmetro e tirar validações do tipo ??
    // Ref: https://bobbyhadz.com/blog/react-optional-props-typescript
    showModal: any;
    hideModal?: any; // 👈️ marked optional
    actionModal?: any;
    footer?: JSX.Element;
    body: JSX.Element;
    headerComponents?: JSX.Element;
    fullscreen?: any;
    title?: string;
    size?: any;
}


const App = (props: ModalProps): JSX.Element => {

    // Criar um props que recebe o footer, caso não exista o props usar o default (que está feito nessa tela)
    const footer = props.footer ??
        <>
            <div className="col-xl-2 col-lg-2 col-md-12 col-sm-12 col-12 mt-1">
                <div className="d-flex flex-nowrap">
                    <button className='btn btn-outline-secondary text-center w-100'
                            onClick={props.hideModal}>Fechar
                    </button>
                </div>
            </div>
            <div className="col-xl-8 col-lg-8 col-md-12 col-sm-12 col-12 mt-1">
            </div>
            <div className="col-xl-2 col-lg-2 col-md-12 col-sm-12 col-12 mt-1">
                <div className="d-flex flex-nowrap">
                    <button className='btn btn-default text-white text-center w-100 mr-1'
                            onClick={props.actionModal ?? props.hideModal}>Salvar
                    </button>
                </div>
            </div>
        </>

    const html =
        <div className="App">
            <Modal show={props.showModal} size={props.size ?? null} onHide={props.hideModal}
                   fullscreen={props.fullscreen ?? null}>
                <Modal.Header closeButton>
                    <div className="row pr-2 pl-2 d-flex justify-content-between align-items-center flex-wrap w-100">
                        <div className="col-6">
                            <Modal.Title>{props.title ?? 'Modal Title'}</Modal.Title>
                        </div>
                        {props.headerComponents ?? <></>}
                    </div>
                </Modal.Header>

                <Modal.Body>
                    {props.body}
                </Modal.Body>

                <Modal.Footer>
                    <div className='row pr-2 pl-2 d-flex justify-content-between align-items-center flex-wrap w-100'>
                        {footer}
                    </div>
                </Modal.Footer>
            </Modal>
        </div>

    return (
        html
    );
}

// App.propTypes = {
//     showModal: PropTypes.bool.isRequired,
//     hideModal: PropTypes.bool.isRequired,
//     body: PropTypes.object.isRequired,
//     footer: PropTypes.object
// };

export default App;