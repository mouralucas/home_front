import React, { useState } from 'react';

const App = ({ symbol = '$', decimalPlaces = 4 }) => {
    const [value, setValue] = useState('');

    // Função para formatar o valor com as casas decimais especificadas
    const formatValue = (inputValue: string) => {
        const numericValue = parseInt(inputValue.replace(/\D/g, '')) || 0;
        const factor = Math.pow(10, decimalPlaces);
        return (numericValue / factor).toFixed(decimalPlaces);
    };

    const handleChange = (e: { target: { value: any; }; }) => {
        const inputValue = e.target.value;
        // Atualiza o estado com o valor formatado
        setValue(formatValue(inputValue));
        console.log(inputValue);
    };

    return (
        <div>
            <div>
                {symbol === '€' ? (
                    <>
                        <input
                            type="text"
                            value={value}
                            onChange={handleChange}
                            placeholder="0.00"
                        />
                        {symbol}
                    </>
                ) : (
                    <>
                        {symbol}
                        <input
                            type="text"
                            value={value}
                            onChange={handleChange}
                            placeholder="0.00"
                        />
                    </>
                )}
            </div>
        </div>
    )
}

export default App;
