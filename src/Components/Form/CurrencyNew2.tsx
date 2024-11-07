import React, {useEffect, useState} from 'react';

interface CurrencyProps {
    prefix: string
    suffix: string
    decimalPlaces: number
    defaultValeu: number
}

function CurrencyInput({
                           prefix = '',
                           suffix = '',
                           decimalPlaces = 2,
                           defaultValue = 0,
                           ...props
                       }) {
    const [value, setValue] = useState<string>('');
    const [signedValue, setSignedValue] = useState<boolean>(false);


    const formatValue = (inputValue: string) => {
        // get the current state of the signed value
        let isNegative = signedValue;

        // check if the defaultValue is negative
        // in this case, the sigh will be the first char in the string
        if (value === '' && /^-/.test(inputValue)) {
            isNegative = true;
        }

        // if the minus sign is typed change the sign of the number
        // in this case, the sign will be the last char in the string
        if (/-$/.test(inputValue)) {
            isNegative = !signedValue;
        }

        const numericValue = parseInt(inputValue.replace(/\D/g, '')) || 0;
        const factor = Math.pow(10, decimalPlaces);
        const formattedValue = (numericValue / factor).toFixed(decimalPlaces);

        // set the state for the sign
        setSignedValue(isNegative);
        const finalValue = prefix + '' + formattedValue + '' + suffix
        return isNegative ? `-${finalValue}` : finalValue;
    };

    const handleChange = (e: { target: { value: any; }; }) => {
        const inputValue = e.target.value;
        setValue(formatValue(inputValue));
    };

    useEffect(() => {
        setValue(formatValue(defaultValue.toFixed(decimalPlaces)));
    }, [])

    return (
        <div>
            <input
                {...props}
                type="text"
                value={value}
                onChange={handleChange}
                placeholder="0.00"
            />
        </div>
    );
}

export default CurrencyInput;
