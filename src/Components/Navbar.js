import React from "react";

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
                <h1>Aqui é o Lucas</h1>
                <p>{this.state.count}</p>
                <div className="links">
                    <a href="/">Menu 1</a>
                    <a href="/menu2">Menu 2</a>
                    <button className='button'  onClick={this.functionCount}>Clique</button>
                </div>
            </nav>
        );
    }

}

export default Navbar