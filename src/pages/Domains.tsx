import React from "react";
import { State as StoreState } from "../store";
import { Dispatch } from "redux";
import { connect } from "react-redux";

import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

import * as Actions from '../store/domains/actions'
import { DomainModel as TableModel } from '../api/Domains'

import Table from "../components/Table"

interface PropsFromState {
    loading: boolean;
    tableData: Array<TableModel>;
    totalRecords: number,
}

interface PropsFromDispatch {
    doFetch: typeof Actions.Fetch;
}

type AllProps = PropsFromState & PropsFromDispatch

interface IState {
}

const columns = [
    {
        field: "name", header: "Domain Name"
    },
    {
        field: "actions", header: "Actions and a long long thing here", cellFunc: (data:any) => {
            return (
                <Typography>Ya mama {data.name}</Typography>
            )
        }
    }
];

class Domains extends React.Component<AllProps, IState> {

    private handleFetch(start: number, limit: number) {
        this.props.doFetch(start, limit);
    }

    render() {
        return (
            <Paper id="domains">
                <Typography variant="title">Domains</Typography>
                <Table columns={columns} data={this.props.tableData} fetchFunc={this.handleFetch.bind(this)}>
                </Table>
            </Paper>
        );
    }
}

function mapStateToProps(state: StoreState):PropsFromState {
    return {
        loading: state.domains.busy,
        tableData: state.domains.data,
        totalRecords: state.domains.totalLength,
    }
}

function mapDispatchToProps(dispatch: Dispatch):PropsFromDispatch {
    return {
        doFetch: (offset: number, limit: number) => dispatch(Actions.Fetch(offset, limit))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Domains);
