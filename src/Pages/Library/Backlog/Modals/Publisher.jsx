import Modal from "../../../../Components/Modal";
import {useEffect, useState} from "react";
import {URL_COUNTRY, URL_PUBLISHER} from "../../../../Services/Axios/ApiUrls";
import handleSubmit from '../../../../Services/Axios/Post'
import AsyncSelect from "react-select/async";
import filterSelect from "../../../../Utils/DataHandling";
import {getData} from "../../../../Services/Axios/Get";


const App = (props) => {
    const [country, setCountry] = useState([])
    const [selectedCountry, setSelectedCountry] = useState([]);
    const [parentPublisher, setParentPublisher] = useState([])
    const [selectedParentPublisher, setSelectedParentPublisher] = useState([])
    const [values, setValues] = useState({});

    const hideModal = () => {
        props.hideModal()
        setValues({
            name: null,
            country_id: 0,
            description: '',
            parent_id: null
        });
        setSelectedCountry(null);
    }

    useEffect(() => {
        if (props.publisher && props.modalState) {
            setValues(props.publisher);
        }
    }, [props.modalState, props.publisher])

    useEffect(() => {
        if (props.publisher) {
            setSelectedCountry(country.filter(i => i.value === props.publisher.country_id)[0]);
        }
    }, [country, props.publisher])

    useEffect(() => {
        if (props.publisher) {
            setSelectedParentPublisher(parentPublisher.filter(i => i.value === props.publisher.parent_id)[0]);
        }
    }, [parentPublisher, props.publisher])

    const getCountry = (query, callback) => {
        if (query) {
            callback(filterSelect(country, query));
        } else {
            getData(URL_COUNTRY).then(response => {
                let options = response == null ? {} : response.countries.map(i => ({value: i.id, label: i.name}))
                callback(options);
                setSelectedCountry(options?.filter(category => category.value === values.category_id)[0]);
                setCountry(options);
            });
        }
    }

    const getParentPublisher = (query, callback) => {
        if (query) {
            callback(filterSelect(country, query));
        } else {
            getData(URL_PUBLISHER).then(response => {
                let options = response == null ? {} : response.publishers.map(i => ({value: i.id, label: i.name}))
                callback(options);
                setSelectedParentPublisher(options?.filter(category => category.value === values.parent_id)[0]);
                setParentPublisher(options);
            });
        }
    }

    const set = name => {
        return ({target: {value}}) => {
            setValues(oldValues => ({...oldValues, [name]: value}));
        }
    }

    const setCombo = (e, name, setFunction) => {
        if (e !== null) {
            setFunction(e);
            return setValues(oldValues => ({...oldValues, [name]: e.value}));
        }
        return setValues(oldValues => ({...oldValues, [name]: e.value}));
    }

    const body = () => {
        let body_html =
            <form>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-4">
                            <label htmlFor="">Nome: {values.name}</label>
                            <input type="text" value={values.name} onChange={set('name')} className="form-control input-default"/>
                        </div>
                        <div className="col-4">
                            <label htmlFor="">Country {values.country_id}</label>
                            <AsyncSelect formTarget={true}
                                         loadOptions={(query, callback) => getCountry(query, callback)}
                                         onChange={(e) => setCombo(e, 'country_id', setSelectedCountry)} defaultOptions
                                         value={selectedCountry}/>
                        </div>
                        <div className="col-4">
                            <label htmlFor="">Editora mãe {values.parent_id}</label>
                            <AsyncSelect formTarget={true}
                                         loadOptions={(query, callback) => getParentPublisher(query, callback)}
                                         onChange={(e) => setCombo(e, 'parent_id', setSelectedParentPublisher)} defaultOptions
                                         value={selectedParentPublisher}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <label htmlFor="">Descrição</label>
                            <textarea className='form-control' value={values.description} id="" cols="30" rows="5"
                                      onChange={set('description')}></textarea>
                        </div>
                    </div>
                </div>
            </form>;

        return body_html
    }

    return (
        <div>
            <Modal
                showModal={props.modalState}
                hideModal={hideModal}
                title={'Editora'}
                body={body()}
                fullscreen={false}
                actionModal={(e) => handleSubmit(e, URL_PUBLISHER, values)}
                size={'lg'}
            />
        </div>
    );
}

export default App;