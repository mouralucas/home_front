import React, { useState } from 'react';
import { Slider, Label, Tooltip } from 'devextreme-react/slider';

function format(value: any) {
    return `${value}%`;
  }

const App = () => {
    const [value, setValue] = useState(10)

    return (
        <>
            <Slider min={0} max={100} defaultValue={35}>
                <Tooltip enabled={true} showMode="always" position="bottom" format={format} />
            </Slider>
        </>
    )
}