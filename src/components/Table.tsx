import React, {ReactNode} from "react";

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';

interface Column {
    field: string;
    header: string;
    headerFunc?: () => ReactNode;
    cellFunc?: (data: any) => ReactNode;
}

interface Props {
    columns: Array<Column>
}


interface IState {
}

export default class CustomTable extends React.Component<Props, IState> {
    constructor(props: Props) {
        super(props);

        this.state = {
            page: 0,
            entriesPerPage: 10,
        }
    }

    private renderHeader() {
        const {columns} = this.props;

        return (
            <TableHead>
                {columns.map(column => {
                    return (
                        <TableCell key={column.field}>
                            {column.headerFunc !== undefined ? column.headerFunc() : column.header}
                        </TableCell>
                    );
                })}
            </TableHead>
        );
    }

    render() {
        return (
            <Table>
                {this.renderHeader()}
            </Table>
        )
    }
}
