import React from 'react';

import ODataStore from 'devextreme/data/odata/store';
import ptMessages from "devextreme/localization/messages/pt.json";
import {locale, loadMessages} from "devextreme/localization";
import DataGrid, {
    Column,
    Grouping,
    GroupPanel,
    Pager,
    Paging,
    SearchPanel,
} from 'devextreme-react/data-grid';


const pageSizes = [10, 25, 50, 100];

const dataSourceOptions = {
    store: new ODataStore({
        url: 'https://js.devexpress.com/Demos/SalesViewer/odata/DaySaleDtoes',
        key: 'Id',
        beforeSend(request) {
            request.params.startDate = '2020-05-10';
            request.params.endDate = '2020-05-15';
        },
    }),
};

class Table extends React.Component {
    constructor(props) {
        super(props);

        loadMessages(ptMessages);
        locale(navigator.language);

        this.state = {
            collapsed: false,
            showInfo: true,
        };

        this.onContentReady = this.onContentReady.bind(this);
        this.setColumns = this.setColumns.bind(this);
        this.setPager = this.setPager.bind(this);
        this.setPaging = this.setPaging.bind(this);
    }

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
                displayMode={this.state.displayMode}
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