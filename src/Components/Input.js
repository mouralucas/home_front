import React from "react";

class Input extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            emailValue: 'smith@corp.com',
        };
        this.rules = {X: /[02-9]/};
        this.valueChanged = this.valueChanged.bind(this);
    }

    valueChanged(data) {
        this.setState({
            emailValue: `${data.value.replace(/\s/g, '').toLowerCase()}@corp.com`,
        });
    }

    render() {
        return (
            <input name={this.props.name}
                     defaultValue={this.props.default}
                     placeholder={this.props.placeholder}
                     className='teste-input'
                     onChange={this.props.onValueChanged}
                     type={this.props.type}
            />
        );
    }
}

Input.defaultProps = {
    type: 'text',
}

export default Input;