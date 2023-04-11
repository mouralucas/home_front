import React from "react";
import TreeList, {Column, ColumnChooser, HeaderFilter, Item, SearchPanel,} from 'devextreme-react/tree-list';
import {Format, Toolbar} from "devextreme-react/data-grid";


interface TreeListProps {
    tableColumns: any[],
    dataSource: any[],
    keyExpr: string,
    parentIdExpr: string,
    toolBar?: any,
    toolBarItems?: any[],
    toolBarRefresh?: boolean,
    loadPanel?: boolean
}

const App = (props: TreeListProps): JSX.Element => {

    const expandedKeys: number[] = [];
    const selectedKeys: number[] = [95];

    const setColumns = () => {
        if (!props.tableColumns) {
            return null
        } else {
            let columns_list = [];
            props.tableColumns.forEach(function (column, index) {
                columns_list.push(
                    <Column
                        key={index}
                        type={column.type ?? null}
                        dataField={column.dataField}
                        caption={column.caption}
                        dataType={column.dataType}
                        format={column.format}
                        alignment={column.alignment ?? 'center'}
                        width={column.width ?? null}
                        visible={column.visible ?? true}
                        // cellTemplate={column.cellTemplate ?? null}
                        customizeText={column.customizeText ?? null}
                        calculateCellValue={column.calculateCellValue}
                        cellRender={column.cellRender ?? null}
                    >
                        {column.child}
                        {column.format && <Format type="currency" precision={5}/>}
                    </Column>
                )
            });

            return columns_list
        }
    }

    const setToolbar = () => {
        let listToolBar = [];

        if (props.toolBarItems) {
            props.toolBarItems.forEach(function (item, index) {
                listToolBar.push(
                    <Item key={index} name={item.name ?? null}
                          location={item.location ?? ''}>{item.child ?? null}</Item>
                )
            });
        }
        return listToolBar
    }

    return (
        <>
            <TreeList
                dataSource={props.dataSource}
                showBorders={true}
                columnAutoWidth={true}
                wordWrapEnabled={true}
                defaultExpandedRowKeys={expandedKeys}
                defaultSelectedRowKeys={selectedKeys}
                keyExpr={props.keyExpr}
                parentIdExpr={props.parentIdExpr}
                id="tasks"
            >
                <SearchPanel visible={true} width={250}/>
                <HeaderFilter visible={true}/>
                {/*<Selection mode="multiple"/>*/}
                <ColumnChooser enabled={true}/>

                {setColumns()}

                <Toolbar visible={props.toolBar}>
                    {setToolbar()}
                </Toolbar>

            </TreeList>
        </>
    )
}

export default App;