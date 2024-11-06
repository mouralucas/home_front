import React, { useState, useEffect } from 'react';

// @ts-ignore
function CurrencyInput({ currencySymbol = 'R$', decimalPlaces = 2, value, onChange }) {
    const [inputValue, setInputValue] = useState('');

    // Formata o valor baseado nas casas decimais
    const formatValue = (value: string) => {
        const numValue = parseInt(value || '0', 10);
        const divisor = Math.pow(10, decimalPlaces);
        return (numValue / divisor).toFixed(decimalPlaces);
    };

    // Atualiza o valor formatado sempre que o input muda
    const handleInputChange = (event: { target: { value: any; }; }) => {
        const { value } = event.target;
        // Remove qualquer caractere que não seja número
        const cleanedValue = value.replace(/\D/g, '');
        setInputValue(cleanedValue);
        onChange && onChange(formatValue(cleanedValue));
    };

    useEffect(() => {
        // Formata o valor inicial do input, se tiver algum valor inicial definido
        setInputValue((prev) => formatValue(prev));
    }, [decimalPlaces]);

    return (
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <span>{currencySymbol}</span>
            <input
                type="text"
                value={formatValue(inputValue)}
                onChange={handleInputChange}
                style={{ marginLeft: 4 }}
            />
        </div>
    );
}

export default CurrencyInput;