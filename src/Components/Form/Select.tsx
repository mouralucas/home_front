import React from "react";
import SelectBox from "devextreme-react/select-box";
import DevExpress from "devextreme";

interface SelectProps {
    dataSource: any
    displayExpr: string
    valueExpr: string
    searchMode?: any | undefined
    searchExpr: string
    onValueChanged: any
    placeholder?: string
    ref?: any
}

const App = (props: SelectProps) => {
    return (
        <SelectBox
            dataSource={props.dataSource}
            displayExpr={props.displayExpr}
            valueExpr={props.valueExpr}
            searchMode={props.searchMode ?? 'contains'}
            searchExpr={props.searchExpr}
            onValueChanged={props.onValueChanged}
            placeholder={props.placeholder ?? 'Selecione um autor'}
            ref={props.ref || null}
            showClearButton={true}
        />
    )
}

export default App;