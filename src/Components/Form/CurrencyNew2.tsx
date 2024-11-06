import React, { useState } from 'react';

function CurrencyInput({ symbol = '$', decimalPlaces = 2, initialValue = 0 }) {


    // Função para formatar o valor, agora aceitando negativos
    const formatValue = (inputValue: string) => {
        // Verifica se o valor é negativo
        const isNegative = inputValue.startsWith('-');
        const numericValue = parseInt(inputValue.replace(/\D/g, '')) || 0;
        const factor = Math.pow(10, decimalPlaces);
        const formattedValue = (numericValue / factor).toFixed(decimalPlaces);

        // Retorna o valor com o sinal negativo, se aplicável
        return isNegative ? `-${formattedValue}` : formattedValue;
    };

    const [value, setValue] = useState(formatValue(initialValue.toString()));

    const handleChange = (e: { target: { value: any; }; }) => {
        const inputValue = e.target.value;
        setValue(formatValue(inputValue));
    };

    return (
        <div>
            {symbol === '€' ? (
                <>
                    <input
                        type="text"
                        value={value}
                        onChange={handleChange}
                        placeholder="0.00"
                    />
                </>
            ) : (
                <>
                    <input
                        type="text"
                        value={value}
                        onChange={handleChange}
                        placeholder="0.00"
                    />
                </>
            )}
        </div>
    );
}

export default CurrencyInput;
