import React from 'react';
import ptMessages from "devextreme/localization/messages/pt.json";
import {loadMessages, locale} from "devextreme/localization";
import DataGrid, {Column, Grouping, GroupPanel, Pager, Paging, SearchPanel,} from 'devextreme-react/data-grid';
import '../Assets/Table.css'


const pageSizes = [10, 15, 20];

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
        this.setGrouping = this.setGrouping.bind(this);
    }

    // Properties customizations
    setColumns() {
        let lista_columns = [];
        this.props.columns.forEach(function (column) {
            lista_columns.push(<Column
                dataField={column.dataField}
                caption={column.caption}
                dataType={column.dataType}
                format={column.format}
                alignment={column.alignment ?? 'center'}
                width={column.width ?? null}
                visible={column.visible ?? true}
            />)
        });
        return lista_columns
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
                showNavigationButtons={this.state.showNavButtons}
            />;
        }
        return pager
    }

    setPaging() {
        let paging;
        if (this.props.paging){
            paging = null;
        } else {
            paging = <Paging defaultPageSize={10}/>;
        }

        return paging
    }

    setGrouping() {
        
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
            >

                <GroupPanel visible={true}/>
                <SearchPanel visible={true} highlightCaseSensitive={true}/>
                <Grouping autoExpandAll={false}/>

                {this.setColumns()}

                {this.setPager()}

                {this.setPaging()}

            </DataGrid>

        );
    }

    onContentReady(e) {
        if (!this.state.collapsed) {
            e.component.expandRow(['EnviroCare']);
            this.setState({
                collapsed: true,
            });
        }
    }
}

export default Table;
