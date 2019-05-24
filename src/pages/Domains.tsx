import React from "react";
import { State as StoreState } from "../store";
import { Dispatch } from "redux";
import { connect } from "react-redux";

import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

import Table from "../components/Table"

interface PropsFromState {
}

interface PropsFromDispatch {
}

type AllProps = PropsFromState & PropsFromDispatch

interface IState {
}

const columns = [
    {
        field: "name", header: "Domain Name"
    }
];

class Domains extends React.Component<AllProps, IState> {
    render() {
        return (
            <Paper id="domains">
                <Typography variant="title">Domains</Typography>
                <Table columns={columns}>

                </Table>
            </Paper>
        );
    }
}

function mapStateToProps(state: StoreState):PropsFromState {
    return {
    }
}

function mapDispatchToProps(dispatch: Dispatch):PropsFromDispatch {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Domains);
