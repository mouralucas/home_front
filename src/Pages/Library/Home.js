import Header from "../../Components/Header";
import MyChart from "../../Components/Chart";
import Button from '../../Components/Button'
import Navbar from '../../Components/Navbar'
import {useState} from "react";
import Login from '../Login'

import {isAuthenticated} from "../../Services/Auth/Auth";


function Home () {

    if (!isAuthenticated()) {
        return <Login />
    }

    return (
        <div className="App">
            {/*<Header />*/}
            <Navbar />
            <div className="content">
                <h1>App component</h1>
            </div>
        </div>
    );
}

export default Home;