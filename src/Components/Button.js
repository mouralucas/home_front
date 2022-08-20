import React from 'react';

import 'devextreme/dist/css/dx.light.css';

import {Button as Btn} from 'devextreme-react/button';

class Button extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Btn
                text={this.props.text}
                onClick={this.props.onClick}
                className={this.props.className}
                color={this.props.color}
            />
        );
    }
}

Button.defaultProps = {
    text: 'Lucas Moura',
    color: '#00FF7F'
};

export default Button;