import React from 'react'
import {Link} from "react-router-dom";
import '../Assets/Header/header.css'
import Navbar from '../Components/Navbar/Base'

class Header extends React.Component {
    render() {
        return (
            <header>
                <div className="nav-area">
                    <Link to="/" className="logo">
                        Logo
                    </Link>
                    <Navbar/>
                </div>
            </header>
        );
    }
}

export default Header;