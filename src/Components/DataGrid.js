import React from 'react';
import ptMessages from "devextreme/localization/messages/pt.json";
import {loadMessages, locale} from "devextreme/localization";
import DataGrid, {Column, ColumnChooser, Export, Grouping, GroupPanel, HeaderFilter, LoadPanel,
    Pager, Paging, SearchPanel, Toolbar} from 'devextreme-react/data-grid';
import '../Assets/Core/Components/Table.css'
import {Item} from "devextreme-react/box";
import {exportDataGrid} from "devextreme/pdf_exporter";
import {Workbook} from "exceljs";
import saveAs from 'file-saver';


const pageSizes = [10, 15, 20];
const exportFormats = ['pdf', 'xlsx'];

class Table extends React.Component {
    constructor(props) {
        super(props);
        console.log(props);

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
        this.setGrouping = this.setGrouping.bind(this);
        this.setColumnChooser = this.setColumnChooser.bind(this);
        this.setLoadPanel = this.setLoadPanel.bind(this);
        this.setExport = this.setExport.bind(this);
        this.setToolbar = this.setToolbar.bind(this);
    }

    // Properties customizations
    setColumns() {
        if (!this.props.tableColumns) {
            return null
        } else {
            let lista_columns = [];
            this.props.tableColumns.forEach(function (column) {
                lista_columns.push(<Column
                    dataField={column.dataField}
                    caption={column.caption}
                    dataType={column.dataType}
                    format={column.format}
                    alignment={column.alignment ?? 'center'}
                    width={column.width ?? null}
                    visible={column.visible ?? true}
                    cellTemplate={column.cellTemplate ?? null}
                />)
            });
            return lista_columns
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
                allowedPageSizes={pageSizes}
                displayMode='full'
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

    setGrouping() {
    }

    setToolbar2() {
        let toolbar;

        if (this.props.toolBar) {
            toolbar = null;
        } else {
            toolbar = <Toolbar>
                <Item name="columnChooserButton"/>
                <Item name="exportButton"/>
                <Item location="after"> </Item>
                <Item name="searchPanel"/>


            </Toolbar>;
        }
        return toolbar
    }

    setToolbar() {
        let lista_toolbar = [];

        if (this.props.toolBarItems) {
            this.props.toolBarItems.forEach(function (item) {
                lista_toolbar.push(
                    <Item name={item.name ?? null} location={item.location ?? ''}>{item.child ?? null}</Item>
                )
            });
        }
        return lista_toolbar
    }

    setLoadPanel() {
        return <LoadPanel enable={this.props.loadPanel ?? false}/>;
    }

    setExport() {
        let export_data;
        if (this.props.export) {
            export_data = null;
        } else {
            export_data = <Export enabled={true} formats={exportFormats} allowExportSelectedData={false}/>;
        }
        return export_data
    }

    // Columns type customization
    priceColumn_customizeText(cellInfo) {
        return cellInfo.value + '$';
    }

    render() {
        return (
            <DataGrid
                dataSource={this.props.data}
                allowColumnReordering={true}
                rowAlternationEnabled={true}
                showBorders={true}
                onContentReady={this.onContentReady}
                showRowLines={this.props.showRowLines ?? true}
                showColumnLines={this.props.showColumnLines ?? true}
                onExporting={this.onExporting}
            >

                <GroupPanel visible={true}/>
                <SearchPanel visible={true} highlightCaseSensitive={true}/>
                <Grouping autoExpandAll={false}/>
                <HeaderFilter visible={true} />

                {this.setColumns()}
                {this.setColumnChooser()}

                {/* Page elements */}
                {this.setPager()}
                {this.setPaging()}

                {/* Toolbar elements */}
                {this.setLoadPanel()}
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
