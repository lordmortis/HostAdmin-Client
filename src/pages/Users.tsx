import React, { ReactNode } from "react";
import { State as StoreState } from "../store";
import { Dispatch } from "redux";
import { connect } from "react-redux";

import Typography from "@material-ui/core/Typography";

import * as Actions from '../store/users/actions'
import { UserModel as TableModel } from '../api/Users'

import EditPage from "./EditPage";

interface PropsFromState {
    loading: boolean;
    tableData: Array<TableModel>;
    totalRecords: number,
    offset: number,
    limit: number,
}

interface PropsFromDispatch {
    doFetch: typeof Actions.Fetch;
    doSave: typeof Actions.Save;
}

type AllProps = PropsFromState & PropsFromDispatch

const columns = [
    {
        field: "username", header: "Username"
    },
    {
        field: "email", header: "Email"
    },
    {
        field: "actions", header: "Actions and a long long thing here", cellFunc: (data:any) => {
            return (
                <Typography>Ya uncle {data.name}</Typography>
            )
        }
    }
];

const fields = [
    { field: "username", header: "Username", type: "string" },
    { field: "email", header: "Email", type: "string" },
    { field: "superAdmin", header: "Super Admin?", type: "bool" },
    { field: "newPassword", header: "Password", type: "password" },
    { field: "passwordConfirmation", header: "Password Confirmation", type: "password" },
];

function Users(props:AllProps) {
    const editProps = {
        ...props,
        pageName: "Users",
        columns: columns,
        fields: fields,
        defaultModel: {
            username: "",
            email: ""
        }
    }

    return EditPage<TableModel>(editProps);
}

function mapStateToProps(state: StoreState):PropsFromState {
    return {
        loading: state.users.busy,
        tableData: state.users.data,
        totalRecords: state.users.totalLength,
        limit: state.users.limit,
        offset: state.users.offset,
    }
}

function mapDispatchToProps(dispatch: Dispatch):PropsFromDispatch {
    return {
        doFetch: (offset: number, limit: number) => dispatch(Actions.Fetch(offset, limit)),
        doSave: (data: TableModel, offset: number, limit: number) => dispatch(Actions.Save(data, offset, limit)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Users);
