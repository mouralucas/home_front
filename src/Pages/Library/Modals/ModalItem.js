import Modal from "../../../Components/Modal";
import {useState} from "react";
import axios from "../../../Services/Axios/Axios";
import {Button as Btn} from "devextreme-react/button";
import {URL_AUTHORS, URL_ITEM, URL_PUBLISHERS} from "../../../Services/Axios/ApiUrls";
import Select from "react-select";


const ModalItem = () => {
    const [modalState, setModalState] = useState(false);

    // Combo boxes variables
    const [authors, setAuthorsList] = useState([]);
    const [publishers, setPublisher] = useState();

    // Form variables
    const [values, setValues] = useState({
        author_id: '',
        publisher_id: '',
        title: '',
        subtitle: ''
    })

    const getAuthors = () => {
        axios.get(URL_AUTHORS).then(response => {
                setAuthorsList(response.data.authors.map(author => ({name: 'author_id', value: author.id, label: author.nm_full})));
            }
        )
    }

    const getPublishers = () => {
        axios.get(URL_PUBLISHERS).then(response => {
            setPublisher(response.data.publishers.map(publisher => ({name: 'publisher_id', value:publisher.id, label: publisher.name})))
        });
    }

    const set = name => {
        return ({target: {value}}) => {
            setValues(oldValues => ({...oldValues, [name]: value}));
        }
    }

    const setCombo = object => {
        if (object !== null) {
            return setValues(oldValues => ({...oldValues, [object.name]: object.value}));
        }
        return setValues(oldValues => ({...oldValues, [object.name]: object.value}));
    }

    const showModalItem = () => {
        getPublishers();
        getAuthors();
        setModalState(true);
    }

    const hideModalItem = () => {
        setModalState(false);
    }

    // Form submit
    const setItem = async e => {
        e.preventDefault();

        const formData = new FormData();
        Object.keys(values).forEach(key => formData.append(key, values[key]));

        await axios({
            method: 'post',
            url: URL_ITEM,
            data: formData,
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(response => {
            return response.data
        }).catch(response => {
            return {'error': response}
        })
    }

    const body = () => {
        let body_html =
                <form onSubmit={setItem}>
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-3">
                                <label htmlFor="{'combo_author'}">Nome do author: {values.author_id}</label>
                                <Select formTarget={true} options={authors} onChange={setCombo}/>
                            </div>
                            <div className="col-3">
                                <label htmlFor="">Editora: {values.author_id}</label>
                                <Select formTarget={true} options={publishers} onChange={setCombo}/>
                            </div>
                            <div className="col-3">
                                <label htmlFor="{'nm_author'}">Título</label>
                                <input value={values.title} onChange={set('title')} type="text" className='form-control input-default'/>
                            </div>
                            <div className="col-3">
                                <label htmlFor="{'subtitle'}">Outra coisa</label>
                                <input value={values.subtitle} onChange={set('subtitle')} type="text" className='form-control input-default'/>
                            </div>
                        </div>
                    </div>
                </form>;

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
                actionModal={setItem}
            />
            <Btn text={'Adicionar Item'} icon={'add'} onClick={showModalItem}></Btn>
        </div>
    );
}

export default ModalItem