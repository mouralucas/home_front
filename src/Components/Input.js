import React from "react";
import TextBox from 'devextreme-react/text-box';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            emailValue: 'smith@corp.com',
        };
        this.rules = {X: /[02-9]/};
        this.valueChanged = this.valueChanged.bind(this);
        console.log(props);
    }

    valueChanged(data) {
        this.setState({
            emailValue: `${data.value.replace(/\s/g, '').toLowerCase()}@corp.com`,
        });
    }

    render() {
        return (
            <TextBox name={this.props.name} defaultValue={this.props.default} placeholder={this.props.placeholder} className='teste-input' />
        );
    }
}

export default App;