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

const data = [
    {id: 0, name: "test0.com"},
    {id: 1, name: "test1.com"},
    {id: 2, name: "test2.com"},
    {id: 3, name: "test3.com"},
    {id: 4, name: "test4.com"},
    {id: 5, name: "test5.com"},
    {id: 6, name: "test6.com"},
    {id: 7, name: "test7.com"},
    {id: 8, name: "test8.com"},
    {id: 9, name: "test9.com"},
    {id: 10, name: "test10.com"},
    {id: 11, name: "test11.com"},
    {id: 12, name: "test12.com"},
    {id: 13, name: "test13.com"},
    {id: 14, name: "test14.com"},
    {id: 15, name: "test15.com"},
    {id: 16, name: "test16.com"},
    {id: 17, name: "test17.com"},
    {id: 18, name: "test18.com"},
    {id: 19, name: "test19.com"},
    {id: 20, name: "test20.com"},
    {id: 21, name: "test21.com"},
    {id: 22, name: "test22.com"},
    {id: 23, name: "test23.com"},
    {id: 24, name: "test24.com"},
    {id: 25, name: "test25.com"},
    {id: 26, name: "test26.com"},
    {id: 27, name: "test27.com"},
    {id: 28, name: "test28.com"},
    {id: 29, name: "test29.com"},
];

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
    render() {
        return (
            <Paper id="domains">
                <Typography variant="title">Domains</Typography>
                <Table columns={columns} data={data}>
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
