import React, {useState} from "react";
import {Navigate, useLocation, useNavigate} from 'react-router-dom';
import '../Assets/Login/Login.css';
import logo from '../Assets/Core/Images/Logo/logo_lucas.svg';
import axios from "../Services/Axios/Axios";
import {isAuthenticated, setToken} from '../Services/Auth/Auth'
import Input from "../Components/Input";
import {Link} from 'react-router-dom'
import {URL_LOGIN} from "../Services/Axios/ApiUrls";

async function loginAPI(credentials) {
    return axios({
        method: 'post',
        url: URL_LOGIN,
        data: credentials,
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }).then(response => {
        return response.data
    }).catch(response => {
        return {'error': response}
    })
}

const Login = () => {
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();

    let navigate = useNavigate();
    let location = useLocation();

    const handleSubmit = async e => {
        e.preventDefault();
        const token = await loginAPI({
            username,
            password
        });

        if (token.hasOwnProperty('error')) {
            alert(token.error.response.data.error);
        } else {
            setToken(token.access);
            // TODO: set to navigate to de user home (create variable to home page)
            let navigate_to = location.state?.from.pathname ?? "/library/home"
            navigate(navigate_to, {replace: true});
        }
    }

    if (isAuthenticated()) {
        // Redirect them to the / page, but save the current location they were
        // trying to go to when they were redirected. This allows us to send them
        // along to that page after they login, which is a nicer user experience
        // than dropping them off on the home page.
        // TODO: set to navigate to de user home (create variable to home page)
        return <Navigate to="/library/home"/>;
    } else

        return (
            <div className='form-login'>
                <div className="container-fluid">
                    <div className="row justify-content-center mt-6">
                        <div className="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-5">
                            <div className="card">
                                <div className="card-body">
                                    <div className="row justify-content-center ">
                                        <div className="col-12 col-sm-10 col-md-8 col-lg-8 col-xl-8">
                                            <img src={logo} alt="Logo" className='mb-4'/>
                                            <form onSubmit={handleSubmit}>
                                                <label htmlFor="">Username</label>
                                                <input name={'username'} placeholder={'Username'} onChange={e => setUserName(e.target.value)} className='form-control'/>
                                                <label htmlFor="">Password</label>
                                                <input type={'password'} name={'password'} placeholder={'Password'} onChange={e => setPassword(e.target.value)} className='form-control'/>
                                                <div className="text-center">
                                                    <button type='submit' className="mt-4 btn btn-primary btn-block w-100">Entrar</button>
                                                </div>
                                            </form>

                                            <p className="mt-4 text-center">
                                                Não consegue acessar?
                                                <Link to="#">Clique aqui.</Link>
                                            </p>
                                        </div>
                                    </div>
                                    <hr className="mt-2 mb-4"/>
                                    <div className="text-center">
                                        <p className="small text-muted">Powered by:</p>
                                        <a href="https://lucasmoura.com" target="_blank" rel="noreferrer"><img src="" alt="Logo Lucas Moura" width="150" className="mb-3"/></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
}

export default Login;