import {NumberFormatBase} from 'react-number-format';

/**
 * Documentation on react-number-format
 *      https://s-yadav.github.io/react-number-format/docs/intro/
 * */

interface CurrencyProps {
    currency: string
}

const App = (props: any) => {
    const format = (value: any): string => {

        const amount: string = new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: props.currency ?? 'BRL',
        }).format(value / 100);

        return `${amount}`;
    };

    return <NumberFormatBase {...props} format={format}/>;
}

export default App;