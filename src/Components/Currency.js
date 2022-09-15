import { NumberFormatBase } from 'react-number-format';

/**
 * Documentation on react-number-format
 *      https://s-yadav.github.io/react-number-format/docs/intro/
 * */

const App = (props) => {
    const format = (value) => {

        const amount = new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
        }).format(value / 100);

        return `${amount}`;
    };

    return <NumberFormatBase {...props} format={format} />;
}

export default App;