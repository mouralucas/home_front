import React from "react";
import {Link} from 'react-router-dom';
import Input from "../Components/Input";
import '../Assets/Login/Login.css';
import logo from '../Assets/Core/Images/Logo/logo_lucas.svg';

class Login extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className='form-login'>
                <div className="card-login">
                    <img src={logo} alt="Logo" className='mb-4'/>
                    <form action="">
                        <label htmlFor="">Username</label>
                        <Input name={'username'} placeholder={'Username'}/>
                        <label htmlFor="">Password</label>
                        <Input name={'password'} placeholder={'Password'} />
                        <button className="mt-4 teste-button">Entrar</button>
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