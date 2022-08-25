import React from "react";


export default class Header extends React.Component{
    render () {
        return (
            <div className="card-header d-flex flex-wrap justify-content-between">
                <div>
                    <img src="src/Components/Card/Card#" alt="" width="25"/>
                    <b>{this.props.title}</b>
                </div>
            </div>
        );
    }
}