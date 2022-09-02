import 'bootstrap/dist/css/bootstrap.min.css';
import {Modal, Button} from 'react-bootstrap';
import {Button as Btn} from 'devextreme-react'
import {useState} from 'react';

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
                    <Button variant="secondary" onClick={props.hideModal}>Close Modal</Button>
                    <Button variant="primary">Save changes</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default App;