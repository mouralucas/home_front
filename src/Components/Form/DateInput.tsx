import React from "react";
import DateBox from 'devextreme-react/date-box';
import DevExpress from "devextreme";
import DateType = DevExpress.ui.dxDateBox.DateType;
import exp from "node:constants";

interface DateInputProps {
    type: DateType
    value: string | Date | undefined | number
    className: string
    useMaskBehavior: boolean
    showClearButton: boolean
    onValueChange: any | undefined
    onFocusIn: any | undefined
    placeholder?: string
}


const App: React.FC<DateInputProps> = ({
                                           type = "date", className = "form-control input-default",
                                           useMaskBehavior = true, placeholder, onValueChange,
                                           onFocusIn, value
                                       }) => {
    return (
        <DateBox value={value}
                 className={className}
                 type={type}
                 placeholder={placeholder}
                 showClearButton={true}
            // inputAttr={dataTimeLabel}
                 useMaskBehavior={useMaskBehavior}
                 onValueChanged={onValueChange}
                 onFocusIn={onFocusIn}
        />
    )
}

export default App;