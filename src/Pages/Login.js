import React from "react";
import Header from "../Components/Header";


class Login extends React.Component {
    constructor(props) {
        super(props);
        console.log(this.props)
        document.body.style.backgroundColor = '#00FF7F'
    }

    render() {
        return <Header />
    }
}

export default Login