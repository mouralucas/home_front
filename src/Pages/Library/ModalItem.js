import Modal from "../../Components/Modal";
import {useEffect, useState} from "react";
import axios from "../../Services/Axios/Axios";
import {Button as Btn} from "devextreme-react/button";
import {URL_AUTHORS} from "../../Services/Axios/ApiUrls";
import Select from "react-select";


const ModalItem = () => {
    const [modalState, setModalState] = useState(false);

    const [authors, setAuthors] = useState([]);
    const [publishers, setPublisher] = useState();

    const showModalItem = () => {
        getAuthors();
        setModalState(true);
    }

    const hideModalItem = () => {
        setModalState(false);
    }

    const getAuthors = () => {
        axios.get(URL_AUTHORS).then(response => {
                setAuthors(response.data.authors.map(author => ({value: author.id, label: author.nm_full})));
            }
        )
    }

    // useEffect(() => {
    //     // Maybe call this function only when click in button to open, not in useEffect
    //     getAuthors();
    // }, []);

    const body = () => {
        let body_html =
            <div>
                <form action="">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-3">
                                <label htmlFor="{'combo_author'}">Nome do author</label>
                                <Select name={'combo_author'} options={authors}/>
                            </div>
                            <div className="col-3">
                                <label htmlFor="{'nm_author'}">Nome do author</label>
                                <input id={'nm_author'} type="text" className='form-control'/>
                            </div>
                            <div className="col-6">
                                <label htmlFor="{'nm_author'}">Outra coisa</label>
                                <input id={'outra_coisa'} type="text" className='form-control'/>
                            </div>
                        </div>
                    </div>
                </form>
            </div>

        return body_html

    }

    return (
        <div>
            <Modal
                showModal={modalState}
                hideModal={hideModalItem}
                title={'Item'}
                body={body()}
                fullscreen={true}
            />
            <Btn text={'Adicionar Item'} icon={'add'} onClick={showModalItem}></Btn>
        </div>
    );
}

export default ModalItem