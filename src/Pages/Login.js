import React, {useState} from "react";
import {Link, Navigate, useNavigate} from 'react-router-dom';
import '../Assets/Login/Login.css';
import logo from '../Assets/Core/Images/Logo/logo_lucas.svg';
import PropTypes from 'prop-types';
import axios from "../Services/Axios/Axios";
import {setToken} from '../Services/Auth/Auth'

async function loginAPI(credentials) {
    return axios({
        method: 'post',
        url: '/user/login',
        data: credentials,
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }).then(response => {
        return response.data
    }).catch(response => {
        alert(response);
    })
}

export default function Login() {
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();

    let navigate = useNavigate();

    const handleSubmit = async e => {
        e.preventDefault();
        const token = await loginAPI({
            username,
            password
        });
        setToken(token.access);
        navigate("/library/home", { replace: true });
    }

    return (
        <div className='form-login'>
            <div className="card-login">
                <img src={logo} alt="Logo" className='mb-4'/>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="">Username</label>
                    <input name={'username'} placeholder={'Username'} onChange={e => setUserName(e.target.value)}/>
                    <label htmlFor="">Password</label>
                    <input type={'password'} name={'password'} placeholder={'Password'} onChange={e => setPassword(e.target.value)}/>
                    <button type='submit' className="mt-4 teste-button">Entrar</button>
                </form>
                <p className="mt-4 text-center">
                    Não consegue acessar?
                    <Link to='/library/home'> Clique aqui </Link>
                </p>
            </div>
        </div>
    );
}