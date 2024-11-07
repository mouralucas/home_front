import React, {useEffect, useState} from 'react';

function CurrencyInput({symbol = '$', decimalPlaces = 2, defaultValue = 487.329}) {
    const [value, setValue] = useState<string>('');
    const [signedValue, setSignedValue] = useState<boolean>(false);


    const formatValue = (inputValue: string) => {
        // TODO: add the support to prefix and suffix
        //  and pass along te default props for the input, like className
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
        return isNegative ? `-${formattedValue}` : formattedValue;
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
                type="text"
                value={value}
                onChange={handleChange}
                placeholder="0.00"
                className={'form-control'}
            />
        </div>
    );
}

export default CurrencyInput;
