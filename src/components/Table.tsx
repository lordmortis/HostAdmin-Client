import React, {ReactNode} from "react";

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';

type FetchFunc = (offset: number, limit: number) => void;

export interface Column {
    field: string;
    header: string;
    loading?: boolean;
    headerFunc?: () => ReactNode;
    cellFunc?: (data: any) => ReactNode;
}

interface IProps {
    columns: Array<Column>;
    data: Array<any>;
    fetchFunc?: FetchFunc;
    totalRecords?: number;
    offset: number;
    limit: number;
}

function renderHeader(columns:Array<Column>):React.ReactNode {
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

function getRenderData(fetch:FetchFunc | undefined, limit:number, offset:number, data: Array<any> | undefined):Array<any> {
    if (data == null) return [];
    if (fetch != null) return data;
    return data.slice(limit, offset + limit);
}

function changePage(event: React.MouseEvent<HTMLButtonElement> | null, fetch:FetchFunc | null, offset: number, limit:number) {
    if (event != null) event.preventDefault();
    if (fetch == null) return;
    fetch(offset, limit);
}

function renderRow(columns:Array<Column>, row: any):ReactNode {
    // @ts-ignore
    const key = row.id != null ? row.id : "unknown_key";
    const cells = columns.map(column => {
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

function renderBody(fetch:FetchFunc | undefined, data: Array<any> | undefined, limit:number, offset:number, columns:Array<Column>):React.ReactNode {
    if (data == null && fetch == null) {
        return (
            <TableBody>
                <TableRow>
                    <TableCell>
                        <Typography children={"No Data or fetch function provided"}/>
                    </TableCell>
                </TableRow>
            </TableBody>
        );
    }

    let rowData = getRenderData(fetch, limit, offset, data);

    return(
        <TableBody>
            {rowData.map(value => { return renderRow(columns, value); })}
        </TableBody>
    );
}

function renderPagination(totalRecords:number | undefined, fetch:FetchFunc | undefined, limit:number, offset:number):ReactNode {
    if (totalRecords == null) totalRecords = 1;
    const entriesPerPage = limit;
    const page = offset / entriesPerPage;

    const onChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, page:number) => {
        event?.preventDefault();
        if (fetch == null) return;
        fetch(page * limit, limit);
    }

    const onChangeRowsPerPage = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        if (fetch == null) return;
        fetch(offset, parseInt(event.target.value, 10));
    }

    return (
        <TablePagination
            count={totalRecords}
            onPageChange={onChangePage}
            onRowsPerPageChange={onChangeRowsPerPage}
            page={page}
            rowsPerPage={entriesPerPage}
        />
    )
}

const CustomTable: React.FC<IProps> = (props:IProps) => {
    React.useEffect(() => {
        if (props.fetchFunc == null) return;
        props.fetchFunc(props.offset, props.limit);
    }, [props.limit, props.offset]);

    return (
        <div>
            <Table>
                {renderHeader(props.columns)}
                {renderBody(props.fetchFunc, props.data, props.limit, props.offset, props.columns)}
            </Table>
            {renderPagination(props.totalRecords, props.fetchFunc, props.limit, props.offset)}
        </div>
    )
}

export default React.memo(CustomTable);
