import { NumberFormatBase } from 'react-number-format';

const App = (props) => {
    const format = (value) => {
        // const amount;
        // if (!Number(value)) amount = 0.00;

        const amount = new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
        }).format(value / 100);

        return `${amount}`;
    };

    return <NumberFormatBase {...props} format={format} />;
}

export default App;