import Modal from "../../../../Components/Modal";
import {useEffect, useState} from "react";
import {URL_COUNTRY, URL_ITEM_SERIE} from "../../../../Services/Axios/ApiUrls";
import handleSubmit from '../../../../Services/Axios/Post'
import AsyncSelect from "react-select/async";
import filterSelect from "../../../../Utils/DataHandling";
import {getData} from "../../../../Services/Axios/Get";


const App = (props) => {
    const [country, setCountry] = useState([])
    const [selectedCountry, setSelectedCountry] = useState()

    const [values, setValues] = useState({});

    useEffect(() => {
        console.log(props.serie)
        if (props.serie && props.modalState) {
            setValues(props.serie);
        }

        if (!props.modalState) {
            setValues({
                serie_id: null,
                name: null,
                nm_original: null,
                description: null,
                country_id: 0,
            });
            setSelectedCountry(null);
        }
    }, [props.modalState, props.serie])

    useEffect(() => {
        if (props.serie) {
            setSelectedCountry(country.filter(i => i.value === props.serie.country_id)[0]);
        }
    }, [country, props.serie])

    const getCountry = (query, callback) => {
        if (query) {
            callback(filterSelect(country, query));
        } else {
            getData(URL_COUNTRY).then(response => {
                let options = response == null ? {} : response?.countries.map(i => ({value: i.id, label: i.name}))
                callback(options);
                setCountry(options);
                setSelectedCountry(options?.filter(country => country.value === values.country_id)[0]);
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
                            <label htmlFor="">Original: {values.nm_original}</label>
                            <input type="text" value={values.nm_original} onChange={set('nm_original')} className="form-control input-default"/>
                        </div>
                        <div className="col-4">
                            <label htmlFor="">Country {values.country_id}</label>
                            <AsyncSelect formTarget={true}
                                         loadOptions={(query, callback) => getCountry(query, callback)}
                                         onChange={(e) => setCombo(e, 'country_id', setSelectedCountry)}
                                         defaultOptions
                                         value={selectedCountry}/>
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
                hideModal={props.hideModal}
                title={'Série'}
                body={body()}
                fullscreen={false}
                actionModal={(e) => handleSubmit(e, URL_ITEM_SERIE, values)}
                size={'lg'}
            />
        </div>
    );
}

export default App;