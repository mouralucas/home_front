import React from 'react';
import ptMessages from "devextreme/localization/messages/pt.json";
import {loadMessages, locale} from "devextreme/localization";
import DataGrid, {
    Column,
    ColumnChooser,
    Export,
    Grouping,
    GroupPanel,
    HeaderFilter,
    LoadPanel,
    Pager,
    Paging,
    SearchPanel,
    Toolbar
} from 'devextreme-react/data-grid';
import '../Assets/Core/Components/Table.css'
import {Item} from "devextreme-react/box";
import {exportDataGrid} from "devextreme/pdf_exporter";
import {Workbook} from "exceljs";
import saveAs from 'file-saver';
import {FilterRow} from "devextreme-react/gantt";

const pageSizes = [10, 15, 20, 50, 100];
const exportFormats = ['pdf', 'xlsx'];

class Table extends React.Component {
    constructor(props) {
        super(props);

        loadMessages(ptMessages);
        locale(navigator.language);

        this.state = {
            collapsed: false,
            showInfo: true,
            showPageSizeSelector: true,
            showNavButtons: true,
        };

        this.onContentReady = this.onContentReady.bind(this);
        this.setColumns = this.setColumns.bind(this);
        this.setPager = this.setPager.bind(this);
        this.setPaging = this.setPaging.bind(this);
        this.setColumnChooser = this.setColumnChooser.bind(this);
        this.setExport = this.setExport.bind(this);
        this.setToolbar = this.setToolbar.bind(this);
    }

    // Properties customizations
    setColumns() {
        if (!this.props.tableColumns) {
            return null
        } else {
            let columns_list = [];
            this.props.tableColumns.forEach(function (column, index) {
                columns_list.push(<Column
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
                    groupIndex={column.groupIndex ?? null}
                    > {column.child} </Column>
                )
            });

            return columns_list
        }
    }

    setPager() {
        let pager;
        // TODO: set the props pager
        if (this.props.pager) {
            pager = null;
        } else {
            pager = <Pager
                visible={true}
                allowedPageSizes={this.props.allowedPageSizes ?? pageSizes}
                displayMode={this.props.displayMode ?? 'full'}
                showPageSizeSelector={this.state.showPageSizeSelector}
                showInfo={this.state.showInfo}
                infoText={this.props.infoText ?? null}
                showNavigationButtons={this.state.showNavButtons}
            />;
        }
        return pager
    }

    setPaging() {
        let paging;
        if (this.props.paging) {
            paging = null;
        } else {
            paging = <Paging defaultPageSize={10}/>;
        }

        return paging
    }

    setColumnChooser() {
        let columnChooser;
        if (this.props.columnChooser) {
            columnChooser = null
        } else {
            columnChooser = <ColumnChooser enabled={true} mode="dragAndDrop"/>;
        }

        return columnChooser
    }

    setToolbar() {
        let lista_toolbar = [];

        if (this.props.toolBarItems) {
            this.props.toolBarItems.forEach(function (item, index) {
                lista_toolbar.push(
                    <Item key={index} name={item.name ?? null} location={item.location ?? ''}>{item.child ?? null}</Item>
                )
            });
        }
        return lista_toolbar
    }

    setExport() {
        let export_data;
        if (this.props.export) {
            export_data = null;
        } else {
            export_data = <Export enabled={false} formats={exportFormats} allowExportSelectedData={false}/>;
        }
        return export_data
    }

    render() {
        return (
            <DataGrid
                keyExpr={this.props.keyExpr}
                dataSource={this.props.data}
                allowColumnReordering={true}
                rowAlternationEnabled={true}
                showBorders={true}
                onContentReady={this.onContentReady}
                showRowLines={this.props.showRowLines ?? true}
                showColumnLines={this.props.showColumnLines ?? true}
                onExporting={this.onExporting}
                // columnHidingEnabled={this.props.columnHidingEnabled ?? true}
                focusedRowEnabled={this.props.focusedRowEnabled ?? false}
            >

                <GroupPanel visible={true}/>
                <SearchPanel visible={true} highlightCaseSensitive={true}/>
                <FilterRow visible={this.props.filterRow ?? true} />
                <Grouping autoExpandAll={false}/>
                <HeaderFilter visible={this.props.headerFilter ?? true} />

                <LoadPanel enable={this.props.loadPanel ?? false}/>

                {this.setColumns()}
                {this.setColumnChooser()}

                {/* Page elements */}
                {this.setPager()}
                {this.setPaging()}

                {/* Toolbar elements */}
                {this.setExport()}

                <Toolbar visible={this.props.toolBar}>
                    {this.setToolbar()}
                </Toolbar>
            </DataGrid>

        );
    }

    onContentReady(e) {
        // if (!this.state.collapsed) {
        //     e.component.expandRow(['EnviroCare']);
        //     this.setState({
        //         collapsed: true,
        //     });
        // }
    }

    onExporting(e) {
        const workbook = new Workbook();
        const worksheet = workbook.addWorksheet('Main sheet');
        exportDataGrid({
            component: e.component,
            worksheet: worksheet,
            customizeCell: function (options) {
                const excelCell = options;
                excelCell.font = {name: 'Arial', size: 12};
                excelCell.alignment = {horizontal: 'left'};
            }
        }).then(function () {
            workbook.xlsx.writeBuffer()
                .then(function (buffer) {
                    saveAs(new Blob([buffer], {type: 'application/octet-stream'}), 'DataGrid.xlsx');
                });
        });
        e.cancel = true;
    }
}

export default Table;
