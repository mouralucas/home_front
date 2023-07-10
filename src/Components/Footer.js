import React, {useEffect, useState} from 'react';
import logo from '../Assets/Core/Images/Logo/logo_lucas.svg';
import {Link} from "react-router-dom";
import {getData} from "../Services/Axios/Get";
import {URL_VERSION} from "../Services/Axios/ApiUrls";
import {toast} from "react-toastify";


const Footer = () => {
    const [version, setVersion] = useState([])

    useEffect(() => {
        getVersion();
    }, []);

    const getVersion = () => {
        getData(URL_VERSION).then(response => {
            setVersion(response)
        }).catch(err => {
                toast.error('Houve um erro ao buscar a versão' + err)
            }
        );
    }

    return (
        <footer className="footer fixed-bottom bg-light">
            <div className="d-flex justify-content-between align-items-center">
                <div></div>

                <div className="d-flex align-items-center">
                    <Link to="#" target="_blank" className="small text-muted">Powered by</Link>
                    <Link to="#" target="_blank">
                        <img src={logo} alt="Logo Lucas" width="80"/>
                    </Link>
                </div>

                <div className="align-middle">
                    {/*<a href="#" className="small text-muted" data-toggle="modal" data-target="#modalVersaoAtual">*/}
                    {/*    Versão 1.0.0*/}
                    {/*</a>*/}
                    <Link to="#" className='small text-mutted'>Versão {version.version}. {version.environment}</Link>
                </div>
            </div>
        </footer>
    );
};

export default Footer;