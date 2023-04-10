import React from "react";
import TreeList, {
    Item,
    Column,
    ColumnChooser,
    HeaderFilter,
    Lookup,
    SearchPanel,
    Selection,
} from 'devextreme-react/tree-list';
import {Format, Toolbar} from "devextreme-react/data-grid";


const tasks = [
    {
        Task_ID: 1,
        Task_Assigned_Employee_ID: 1,
        Task_Subject: 'Plans 2015',
        Task_Start_Date: '2015-01-01T00:00:00',
        Task_Due_Date: '2015-04-01T00:00:00',
        Task_Status: 'Completed',
        Task_Priority: 4,
        Task_Completion: 100,
        Task_Parent_ID: 0,
    }, {
        Task_ID: 2,
        Task_Assigned_Employee_ID: 2,
        Task_Subject: 'Health Insurance',
        Task_Start_Date: '2015-02-12T00:00:00',
        Task_Due_Date: '2015-05-30T00:00:00',
        Task_Status: 'In Progress',
        Task_Priority: 4,
        Task_Completion: 75,
        Task_Parent_ID: 0,
    },
    {
        Task_ID: 95,
        Task_Assigned_Employee_ID: 1,
        Task_Subject: 'Complete Shipper Selection Form',
        Task_Start_Date: '2015-07-21T00:00:00',
        Task_Due_Date: '2016-04-11T00:00:00',
        Task_Status: 'Deferred',
        Task_Priority: 4,
        Task_Completion: 0,
        Task_Parent_ID: 1,
    }];


const priorities = [
    {id: 1, value: 'Low'},
    {id: 2, value: 'Normal'},
    {id: 3, value: 'Urgent'},
    {id: 4, value: 'High'},
];


const App = (props) => {

    const customizeTaskCompletionText = (cellInfo) => {
        return `${cellInfo.valueText}%`;
    }

    const statuses = [
        'Not Started',
        'Need Assistance',
        'In Progress',
        'Deferred',
        'Completed',
    ];

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
        let lista_toolbar = [];

        if (props.toolBarItems) {
            props.toolBarItems.forEach(function (item, index) {
                lista_toolbar.push(
                    <Item key={index} name={item.name ?? null}
                          location={item.location ?? ''}>{item.child ?? null}</Item>
                )
            });
        }
        return lista_toolbar
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
                <Selection mode="multiple"/>
                <ColumnChooser enabled={true}/>

                {setColumns()}
                {/*<Column dataField="Task_Subject" width={300}/>*/}
                {/*<Column*/}
                {/*    dataField="Task_Status"*/}
                {/*    caption="Status"*/}
                {/*    minWidth={100}*/}
                {/*>*/}
                {/*    <Lookup dataSource={statuses}/>*/}
                {/*</Column>*/}
                {/*<Column*/}
                {/*    dataField="Task_Priority"*/}
                {/*    caption="Priority"*/}
                {/*    visible={false}*/}
                {/*>*/}
                {/*    <Lookup dataSource={priorities} valueExpr="id" displayExpr="value"/>*/}
                {/*</Column>*/}
                {/*<Column*/}
                {/*    dataField="Task_Completion"*/}
                {/*    caption="% Completed"*/}
                {/*    minWidth={100}*/}
                {/*    customizeText={customizeTaskCompletionText}*/}
                {/*    visible={false}*/}
                {/*/>*/}
                {/*<Column*/}
                {/*    dataField="Task_Start_Date"*/}
                {/*    caption="Start Date"*/}
                {/*    dataType="date"*/}
                {/*/>*/}
                {/*<Column*/}
                {/*    dataField="Task_Due_Date"*/}
                {/*    caption="Due Date"*/}
                {/*    dataType="date"*/}
                {/*/>*/}

                <Toolbar visible={props.toolBar}>
                    {setToolbar()}
                </Toolbar>

            </TreeList>
        </>
    )
}

export default App;