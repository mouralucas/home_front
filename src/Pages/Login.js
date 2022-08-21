import React from "react";
import {Link} from 'react-router-dom';
import Input from "../Components/Input";
import '../Assets/Login/Login.css';
import logo from '../Assets/Core/Images/Logo/logo_lucas.svg';
import PropTypes from 'prop-types';
import axios from "../Services/Axios/Axios";



class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: null,
            password: null,
            token: null,
        }

        this.setUsername = this.setUsername.bind(this);
        this.setPassword = this.setPassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.LoginAPI = this.LoginAPI.bind(this);
    }

    setUsername(e) {
        const previousValue = e.previousValue;
        const newValue = e.value;

        this.setState({username: newValue});
    }

    setPassword(e) {
        const previousValue = e.previousValue;
        const newValue = e.value;

        this.setState({
            password: newValue
        });
    }

    async LoginAPI(credentials) {
        return axios({
            method: 'post',
            url: '/user/login',
            data: credentials,
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(response => {
            this.setToken(response.data);
        }).catch(response => {
            alert('Error');
        })
    }

    handleSubmit = async e => {
        e.preventDefault();

        let username = this.state.username
        let password = this.state.password
        const token = await this.LoginAPI({
            username,
            password
        });
    }

    setToken(token) {
        localStorage.setItem('userToken', token.access);
    }


    render() {
        return (
            <div className='form-login'>
                <div className="card-login">
                    <img src={logo} alt="Logo" className='mb-4'/>
                    <form action="">
                        <label htmlFor="">Username</label>
                        <Input name={'username'} placeholder={'Username'} onValueChanged={this.setUsername}/>
                        <label htmlFor="">Password</label>
                        <Input type={'password'} name={'password'} placeholder={'Password'} onValueChanged={this.setPassword}/>
                        <button type='submit' onClick={this.handleSubmit} className="mt-4 teste-button">Entrar</button>
                    </form>
                    <p className="mt-4 text-center">
                        Não consegue acessar?
                        <Link to='/library/home'> Clique aqui </Link>
                    </p>
                </div>
            </div>
        );
    }
}

export default Login