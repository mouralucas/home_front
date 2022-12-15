import Modal from "../../../../Components/Modal";
import {useEffect, useState} from "react";
import {URL_AUTHOR, URL_COUNTRY, URL_LANGUAGE} from "../../../../Services/Axios/ApiUrls";
import DateBox from "devextreme-react/date-box";
import Moment from "moment/moment";
import handleSubmit from '../../../../Services/Axios/Post'
import AsyncSelect from "react-select/async";
import filterSelect from "../../../../Utils/DataHandling";
import {getData} from "../../../../Services/Axios/Get";
import {CheckBox} from 'devextreme-react/check-box';

const App = (props) => {
    const [country, setCountry] = useState([])
    const [selectedCountry, setSelectedCountry] = useState()

    const [language, setLanguage] = useState([]);
    const [selectedLanguage, setSelectedLanguage] = useState();

    const [values, setValues] = useState({});

    useEffect(() => {
        if (props.author && props.modalState) {
            setValues(props.author);
        }

        if (!props.modalState) {
            setValues({
                author_id: null,
                nm_full: null,
                country_id: 0,
                dat_birth: null,
                language_id: 0,
                description: '',
            });
            setSelectedCountry(null);
            setSelectedLanguage(null);
        }
    }, [props.modalState, props.author])


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

    const getLanguage = (query, callback) => {
        if (query) {
            callback(filterSelect(language, query));
        } else {
            getData(URL_LANGUAGE).then(response => {
                let options = response.languages.map(i => ({value: i.id, label: i.name}));
                callback(options);

                setLanguage(options);
                setSelectedLanguage(options?.filter(i => i.value === values.language_id)[0]);
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

    const setDate = (e, name) => {
        if (e.value !== null) {
            return setValues(oldValues => ({...oldValues, [name]: Moment(e.value).format('YYYY-MM-DD')}))
        } else {
            return setValues(oldValues => ({...oldValues, [name]: e.value}))
        }
    }

    const body = () => {
        let body_html =
            <form>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-3">
                            <label htmlFor="">Nome: {values.nm_full}</label>
                            <input type="text" value={values.nm_full} className="form-control input-default" onChange={set('nm_full')}/>
                        </div>
                        <div className="col-3">
                            <label htmlFor="">Data nascimento</label>
                            <DateBox value={values.dat_birth} type="date" className='form-control input-default'
                                     onValueChanged={(date) => setDate(date, 'dat_birth')}/>
                        </div>
                        <div className="col-3">
                            <label htmlFor="">Country {values.country_id}</label>
                            <AsyncSelect formTarget={true}
                                         loadOptions={(query, callback) => getCountry(query, callback)}
                                         onChange={(e) => setCombo(e, 'country_id', setSelectedCountry)} defaultOptions
                                         value={selectedCountry}/>
                        </div>
                        <div className="col-3">
                            <label htmlFor="">Idioma {values.language_id}</label>
                            <AsyncSelect formTarget={true}
                                         loadOptions={(query, callback) => getLanguage(query, callback)}
                                         onChange={(e) => setCombo(e, 'language_id', setSelectedLanguage)}
                                         defaultOptions value={selectedLanguage}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 mt-2">
                            <CheckBox
                                text="É tradutor"
                                hint="Approve"
                                iconSize="25"
                            />
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
                title={'Autor'}
                body={body()}
                fullscreen={false}
                actionModal={(e) => handleSubmit(e, URL_AUTHOR, values)}
                size={'lg'}
            />
        </div>
    );
}

export default App;