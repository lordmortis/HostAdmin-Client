import React, {ReactNode} from "react";

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';

interface Column {
    field: string;
    header: string;
    loading?: boolean;
    headerFunc?: () => ReactNode;
    cellFunc?: (data: any) => ReactNode;
}

interface Props {
    columns: Array<Column>;
    data: Array<any>;
    fetchFunc?: (start: number, limit: number) => void;
    totalRecords?: number;
}

interface IState {
    page: number,
    entriesPerPage: number,
}

export default class CustomTable extends React.Component<Props, IState> {
    constructor(props: Props) {
        super(props);

        this.state = {
            page: 0,
            entriesPerPage: 10,
        }
    }

    componentDidMount() {
        this.getTableData();
    }

    private getTableData() {
        if (this.props.fetchFunc === undefined) return;

        const limit = this.state.entriesPerPage;
        const startRow = this.state.page * limit;
        this.props.fetchFunc(limit, startRow);
    }

    private getRenderData():Array<any> {
        const limit = this.state.entriesPerPage;
        const startRow = this.state.page * limit;

        if (this.props.fetchFunc != null) {
            return this.props.data;
        } else if (this.props.data != null) {
            return this.props.data.slice(startRow, startRow + limit);
        }

        return [];
    }

    private renderHeader():ReactNode {
        const {columns} = this.props;

        return (
            <TableHead>
                <TableRow>
                    {columns.map(column => {
                        return (
                            <TableCell key={column.field}>
                                {column.headerFunc !== undefined ? column.headerFunc() : column.header}
                            </TableCell>
                        );
                    })}
                </TableRow>
            </TableHead>
        );
    }

    private renderBody():ReactNode {
        if (this.props.data == null && this.props.fetchFunc == null) {
            return (
                <TableBody>
                    <TableRow>
                        <TableCell>
                            <Typography children={"No Data or Datafunc provided"}/>
                        </TableCell>
                    </TableRow>
                </TableBody>
            );
        }

        let rowData = this.getRenderData();

        return(
            <TableBody>
                {rowData.map(value => { return this.renderRow(value); })}
            </TableBody>
        );
    }

    private renderRow(row: any):ReactNode {
        // @ts-ignore
        const key = row.id != null ? row.id : "unknown_key";
        const cells = this.props.columns.map(column => {
            // @ts-ignore
            return (
               <TableCell key={column.field}>
                   {column.cellFunc != null ? column.cellFunc(row) : row[column.field]}
               </TableCell>
           )
        });

        return (
            <TableRow key={key} children={cells}/>
        )
    }

    private renderPagination():ReactNode {
        let totalRecords = this.props.data.length;
        if (this.props.fetchFunc !== undefined && this.props.totalRecords !== undefined) {
            totalRecords = this.props.totalRecords;
        }

        const { page, entriesPerPage} = this.state;

        return (
            <TablePagination
                count={totalRecords}
                onChangePage={this.changePage.bind(this)}
                onChangeRowsPerPage={this.changeRowsPerPage.bind(this)}
                page={page}
                rowsPerPage={entriesPerPage}
            />
        )
    }

    private changePage(event: React.MouseEvent<HTMLButtonElement> | null, page: number) {
        if (event != null) event.preventDefault();
        this.setState({
            ...this.state,
            page: page
        });
        this.getTableData();
    }

    private changeRowsPerPage(event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) {
        this.setState({
            ...this.state,
            entriesPerPage: parseInt(event.target.value, 10)
        });
        this.getTableData();
    }

    render() {
        return (
            <div>
                <Table>
                    {this.renderHeader()}
                    {this.renderBody()}
                </Table>
                {this.renderPagination()}
            </div>
        )
    }
}
