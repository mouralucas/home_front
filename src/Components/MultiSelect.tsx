import React from "react";
import SelectBox from "devextreme-react/select-box";
import DevExpress from "devextreme";
import {TagBox} from "devextreme-react";

interface SelectProps {
    dataSource: any
    displayExpr: string
    valueExpr: string
    searchMode?: any | undefined
    searchExpr: string
    onValueChanged: any
    placeholder?: string
}

const App = (props: SelectProps) => {
    return (
        <TagBox
            dataSource={props.dataSource}
            displayExpr={props.displayExpr}
            valueExpr={props.valueExpr}
            searchMode={props.searchMode ?? 'contains'}
            searchExpr={props.searchExpr}
            onValueChanged={props.onValueChanged}
            placeholder={props.placeholder ?? 'Selecione um autor'}
        />
    )
}

export default App;