import React from 'react';
import Table from "../DataGrid";
import '../../Assets/Core/Components/Cards.css'
import Header from "../../Components/Card/Header";


/**
 * Component the defines a Card
 *  All properties can be changed through props variable
 *  If it is a card of table, the properties are forwarded to the DataGrid component
 *      All the table configuration must be set in the component that uses the CardTable
 */
class Card extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                        <div className="card card-custom">
                            <div className="card-img"></div>
                            <Header />
                            <div className="card-body">
                                <Table {...this.props}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Card;