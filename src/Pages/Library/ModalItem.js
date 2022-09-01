import Modal from "../../Components/Modal";
import {useEffect, useState} from "react";
import axios from "../../Services/Axios/Axios";


const ModalItem = () => {
    const [authors, setAuthors] = useState()
    const [publishers, setPublisher] = useState()

    const getAuthors = () => {
        axios.get('/library/ajax/author').then(response => {
                setAuthors(response.data.authors);
            }
        )
    }

    useEffect(() => {
        // Maybe call this function only when click in button to open, not in useEffect
        getAuthors();
    }, []);

    return (
        <Modal
            title={'Item'}
            launchButtonText={'Adicionar Item'}
            launchButtonIcon={'add'}
        />
    );
}

export default ModalItem