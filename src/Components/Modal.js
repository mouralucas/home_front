import 'bootstrap/dist/css/bootstrap.min.css';
import {Modal, Button} from 'react-bootstrap';
import {Button as Btn} from 'devextreme-react'
import {useState} from 'react';

const App = (props) => {
    const [show, setShow] = useState(false);

    const modalClose = () => setShow(false);
    const modalShow = () => setShow(true);

    return (
        <div className="App">
            <Btn text={props.launchButtonText} icon={props.launchButtonIcon} onClick={modalShow}> </Btn>
            <Modal show={show} onHide={modalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{props.title ?? 'Modal Title'}</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <p>Body Content.</p>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={modalClose}>Close Modal</Button>
                    <Button variant="primary">Save changes</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default App;