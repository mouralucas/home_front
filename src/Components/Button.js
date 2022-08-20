import React from 'react';

import 'devextreme/dist/css/dx.light.css';

import {Button as Btn} from 'devextreme-react/button';

class Button extends React.Component {
    render() {
        return (
            <Btn
                text="Click me"
                onClick={this.sayHelloWorld}
            />
        );
    }

    sayHelloWorld() {
        alert('Hello world!')
    }
}

export default Button;