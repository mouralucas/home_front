import React from "react";
import {Link} from "react-router-dom";
import {logout} from "../Services/Auth/Auth";
import logo from '../Assets/Core/Images/Logo/logo_lucas.svg';
import '../Assets/Core/Components/Navbar.css'

const App = (props) => {
    return (
        <nav className="navbar">
            <img src={logo} alt="Logo" />
            <div className="links">
                <Link to="/library/home">Biblioteca</Link>
                <Link to="/finance/dashboard">Dashboard</Link>
                <Link to="/finance/records">Financeiro</Link>
                <button className='button' onClick={logout}>Sair</button>
                {/*<Link to={'/logout'}> Logout </Link>*/}
            </div>
        </nav>
    );
}

export default App;