import React from 'react';
import Table from "./DataGrid";

class Card extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-header d-flex flex-wrap bg-body">
                                <div>
                                    <img src="#" alt="" width="25"/>
                                    Livros
                                </div>
                            </div>
                            <div className="card-body">
                                <Table columns={this.props.colunasTabelaItem} data={this.props.data}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Card.defaultProps = {

}
export default Card;