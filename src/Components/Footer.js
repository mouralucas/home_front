import React from 'react';
import logo from '../Assets/Core/Images/Logo/logo_lucas.svg';
import {Link} from "react-router-dom";

const Footer = () => {
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
                    <Link to="#" className='small text-mutted'>Versão 1.0.0.</Link>
                </div>
            </div>
        </footer>
    );
};

export default Footer;