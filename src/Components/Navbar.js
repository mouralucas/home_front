import React from "react";
import {Link} from "react-router-dom";
import {logout} from "../Services/Auth/Auth";
import logo from '../Assets/Core/Images/Logo/logo_lucas.svg';
import '../Assets/Core/Components/Navbar.css'

const App = (props) => {
    return (
        <div class="container">
            <nav class="navbar bg-dark">
                <div class="container">
                    <a class="navbar-brand" href={'www.google.com'}>
                        <img src={logo} alt={'Logo'}/>
                    </a>
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarResponsive">
                        <ul class="navbar-nav ml-auto">
                            <li class="nav-item active">
                                <a class="nav-link" href="#">Home
                                    <span class="sr-only">(current)</span>
                                </a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#">About</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#">Profile</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#">Impressum</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default App;