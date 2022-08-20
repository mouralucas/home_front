import React from "react";
import Header from "../Components/Header";
import {Link} from 'react-router-dom'
import '../Assets/Login/Login.css'

class Login extends React.Component {
    constructor(props) {
        super(props);
        console.log(this.props)
    }

    render() {
        return (
            <div className='form-login'>
                <div className="">
                    <form action="">
                        <label htmlFor="">Username</label>
                        <input type="text"/>
                        <label htmlFor="">Password</label>
                        <input type="password"/>
                    </form>
                    <p class="mt-4 text-center">
                        Não consegue acessar?
                        <Link to='/library/home'> Clique aqui </Link>
                    </p>
                </div>
            </div>
        );
    }
}

export default Login