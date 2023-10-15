import React from "react";
import DataGrid, {
    Column,
    Summary,
    TotalItem,
    ColumnChooser,
    Format,
    Grouping,
    GroupPanel,
    HeaderFilter,
    LoadPanel,
    Pager,
    Paging,
    SearchPanel,
    Toolbar
} from 'devextreme-react/data-grid';
import {Item} from "devextreme-react/box";
import {FilterRow} from "devextreme-react/gantt";
import '../../Assets/Core/Components/Table.css'
import {DataGridColumn, DataGridToolBarItem} from "../../Assets/Core/Components/Interfaces";


const pageSizes: number[] = [10, 15, 20, 50, 100];
const exportFormats: string[] = ['pdf', 'xlsx'];

interface DataGridProps {
    data: any
    keyExpr: string
    columns: DataGridColumn[]
    allowedPageSizes?: number[]
    allowColumnReordering?: boolean
    rowAlternationEnabled?: boolean
    showBorders?: boolean
    showRowLines?: boolean
    showColumnLines?: boolean
    pagerDisplayMode?: string
    pager?: any
    paging?: any
    pagerInfoText?: string
    showPagerInfo?: boolean
    showPagerNavButtons?: boolean
    showPageSizeSelector?: boolean
    columnChooser?: any
    showToolBar?: boolean
    toolBarItems?: any[]
    showFilterRow?: boolean
    showHeaderFilter?: boolean
    showLoadPanel?: boolean
    focusedRowEnabled?: boolean
    groupPanel?: {
        visible: boolean
    }
    searchPanel?: {
        visible?: boolean,
        highlightCaseSensitive?: boolean
    }
    toolBar?: {
        visible?: boolean
        items?: DataGridToolBarItem[]
    }
    summary?: {
        field: any
        type: string
        displayFormat: any
    }
}

const App = (props: DataGridProps): JSX.Element => {
    const setColumns = (): JSX.Element[] => {
        if (!props.columns) {
            return []
        } else {
            let columns_list: JSX.Element[] = [];
            props.columns.forEach(function (column: DataGridColumn, index: number) {
                columns_list.push(
                    <Column
                        key={column.dataField}
                        type={column.type ?? null}
                        dataField={column.dataField}
                        caption={column.caption}
                        dataType={column.dataType}
                        format={column.format}
                        alignment={column.alignment ?? 'center'}
                        width={column.width ?? null}
                        visible={column.visible ?? true}
                        cellTemplate={column.cellTemplate}
                        customizeText={column.customizeText ?? null}
                        calculateCellValue={column.calculateCellValue}
                        cellRender={column.cellRender ?? null}
                        groupIndex={column.groupIndex ?? null}
                    >
                        {column.child}
                        {column.format && <Format type="currency" precision={5}/>}
                    </Column>
                )
            });

            return columns_list
        }
    }

    const setPager = (): JSX.Element => {
        let pager;
        if (props.pager) {
            pager = <></>;
        } else {
            pager = <Pager
                visible={true}
                allowedPageSizes={props.allowedPageSizes ?? pageSizes}
                displayMode={props.pagerDisplayMode ?? 'full'}
                showPageSizeSelector={props.showPageSizeSelector ?? true}
                showInfo={props.showPagerInfo ?? true}
                infoText={props.pagerInfoText ?? null}
                showNavigationButtons={props.showPagerNavButtons ?? true}
            />;
        }
        return pager
    }

    const setPaging = (): JSX.Element | null => {
        let paging;
        if (props.paging) {
            paging = null;
        } else {
            paging = <Paging defaultPageSize={10}/>;
        }

        return paging
    }

    const setColumnChooser = (): JSX.Element | null => {
        let columnChooser;
        if (props.columnChooser) {
            columnChooser = null
        } else {
            columnChooser = <ColumnChooser enabled={true} mode="dragAndDrop"/>;
        }

        return columnChooser
    }

    const setToolbar = (): JSX.Element[] | null => {
        let lista_toolbar: any[] = [];
        if (props.toolBar?.items) {
            props.toolBar?.items?.forEach(function (item: any, index: number) {
                const propsItem = {
                    key: index,
                    name: item.name,
                    location: item.location
                }
                lista_toolbar.push(
                    <Item {...propsItem}>{item.child ?? null}</Item>
                )
            });
        }
        return lista_toolbar
    }

    const setSummary = (): JSX.Element => {
        if (props.summary) {
            return <Summary>
                <TotalItem
                    column={props.summary.field}
                    summaryType={props.summary.type ?? "sum"} // O tipo de resumo, você pode usar "sum", "avg", "count" etc.
                    displayFormat={props.summary.displayFormat ?? "Total: {0}"} // O formato de exibição do valor total
                />
            </Summary>
        } else {
            return <></>
        }
    }

    return (
        <>
            <DataGrid
                keyExpr={props.keyExpr}
                dataSource={props.data}
                allowColumnReordering={props.allowColumnReordering ?? true}
                rowAlternationEnabled={props.rowAlternationEnabled ?? true}
                showBorders={props.showBorders ?? true}
                // onContentReady={onContentReady}
                showRowLines={props.showRowLines ?? true}
                showColumnLines={props.showColumnLines ?? true}
                // onExporting={onExporting}
                // columnHidingEnabled={props.columnHidingEnabled ?? true}
                focusedRowEnabled={props.focusedRowEnabled ?? false}
                // onRowPrepared={}
            >

                <GroupPanel visible={props.groupPanel?.visible ?? false}/>
                <SearchPanel visible={props.searchPanel?.visible ?? false} highlightCaseSensitive={props.searchPanel?.highlightCaseSensitive ?? true}/>
                <FilterRow visible={props.showFilterRow ?? false}/>
                <Grouping autoExpandAll={false}/>
                <HeaderFilter visible={props.showHeaderFilter ?? false}/>

                <LoadPanel enabled={props.showLoadPanel ?? false}/>

                {setColumns()}
                {setSummary()}
                {setColumnChooser()}

                {/* Page elements */}
                {setPager()}
                <Paging defaultPageSize={props.paging ?? 10}/>;

                {/* Toolbar elements */}
                {/*{setExport()}*/}

                {props.toolBar &&
                    <Toolbar visible={props.toolBar.visible}>
                        {setToolbar()}
                    </Toolbar>
                }
            </DataGrid>
        </>
    )
}

export default App;