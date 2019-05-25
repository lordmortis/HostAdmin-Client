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
    headerFunc?: () => ReactNode;
    cellFunc?: (data: any) => ReactNode;
}

interface Props {
    columns: Array<Column>
    data?: Array<any>
    fetchFunc?: (start: number, limit: number) => Array<any>
    total?: number
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

    private getRenderData():Array<object> {
        const limit = this.state.entriesPerPage;
        const startRow = this.state.page * limit;

        if (this.props.fetchFunc != null) {
            return this.props.fetchFunc(startRow, limit);
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

    render() {
        return (
            <Table>
                {this.renderHeader()}
                {this.renderBody()}
            </Table>
        )
    }
}
