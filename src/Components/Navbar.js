import React from "react";
import {Link} from "react-router-dom";
import {logout} from "../Services/Auth/Auth";

class Navbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 0
        };

        this.functionCount = this.functionCount.bind(this);
    }

    functionCount() {
        this.setState({count: this.state.count + 1})
    }

    render () {
        return (
            <nav className="navbar">
                <h1>Lucas Moura</h1>
                <p>{this.state.count}</p>
                <div className="links">
                    <Link to="/library/home">Biblioteca</Link>
                    <Link to="/finance/home">Financeiro</Link>
                    <button className='button'  onClick={logout}>Sair</button>
                    {/*<Link to={'/logout'}> Logout </Link>*/}
                </div>
            </nav>
        );
    }

}

export default Navbar