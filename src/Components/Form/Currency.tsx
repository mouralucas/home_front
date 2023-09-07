import {NumberFormatBase} from 'react-number-format';

/**
 * Documentation on react-number-format
 *      https://s-yadav.github.io/react-number-format/docs/intro/
 * */

interface CurrencyProps {
    currency: string
    minimumFractionDigits: number
}

const App = (props: any) => {
    const format = (value: any): string => {

        // TODO: Add rule to divide the value based on the minimumFractionDigits
        //  property and how to show wherever is used
        const amount: string = new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: props.currency ?? 'BRL',
            minimumFractionDigits: 2
        }).format(value / 100);

        return `${amount}`;
    };

    return <NumberFormatBase {...props} format={format}/>;
}

export default App;

// ChatGPT version
// import React from 'react';
// import { NumberFormatBase } from 'react-number-format';
//
// interface CurrencyProps {
//     currency: string;
//     decimalPlaces?: number;
// }
//
// const App = (props: CurrencyProps) => {
//     const { currency, decimalPlaces } = props;
//
//     const format = (value: any): string => {
//         const options: Intl.NumberFormatOptions = {
//             style: 'currency',
//             currency: currency ?? 'BRL',
//             minimumFractionDigits: decimalPlaces || 2, // Set the decimal places here
//         };
//
//         const amount: string = new Intl.NumberFormat('pt-BR', options).format(value / 100);
//
//         return `${amount}`;
//     };
//
//     return <NumberFormatBase {...props} format={format} />;
// };
//
// export default App;
