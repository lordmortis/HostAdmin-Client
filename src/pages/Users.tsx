import React, { ReactNode } from "react";
import { State as StoreState } from "../store";
import { Dispatch } from "redux";
import { connect } from "react-redux";

import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

import * as Actions from '../store/users/actions'
import { UserModel as TableModel } from '../api/Users'

import EditModel from '../components/EditModel'
import Table from "../components/Table"

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

interface IState {
    editingModel?: object
}

const columns = [
    {
        field: "username", header: "Username"
    },
    {
        field: "email", header: "Email"
    },
    {
        field: "superAdmin", header: "Super Admin"
    },
    {
        field: "actions", header: "Actions and a long long thing here", cellFunc: function(data:any) {
            return (
                <div>
                    <Button
                        // @ts-ignore
                        onClick={this.handleEdit.bind(this, data)}
                        variant={"raised"}
                        children={"Edit"}
                        key="edit"
                    />
                </div>
            )
        }
    }
];

const fields = [
    { field: "username", header: "Username", type: "string" },
    { field: "email", header: "Email", type: "string" },
    { field: "superAdmin", header: "Super Admin", type: "boolean" },
    { field: "newPassword", header: "Password", type: "password" },
    { field: "passwordConfirmation", header: "Password Confirmation", type: "password" },
];

class Users extends React.PureComponent<AllProps, IState> {
    constructor(props: AllProps) {
        super(props);

        this.state = {
            editingModel: undefined,
        }
    }

    private handleFetch(offset: number, limit: number) {
        this.props.doFetch(offset, limit);
    }

    private handleCreate(event: React.FormEvent) {
        event.preventDefault();
        this.setState({
            ...this.state,
            editingModel: {
            }
        })
    }

    handleEdit(model: any, event: React.FormEvent, ) {
        event.preventDefault();
        this.setState({
            ...this.state,
            editingModel: model
        })
    }

    private handleModelEditFieldUpdate(field: string, newValue: any) {
        const newModel = Object.assign({}, this.state.editingModel);
        // @ts-ignore
        newModel[field] = newValue;
        this.setState({
            ...this.state,
            editingModel: newModel,
        });
    }

    private handleModelEditCancel() {
        this.setState({
            ...this.state,
            editingModel: undefined,
        });
    }

    private handleModelEditSave() {
        const newValues = this.state.editingModel;
        if (newValues === undefined) return;
        // @ts-ignore
        this.props.doSave(newValues,0, 10);
        this.setState({
            ...this.state,
            editingModel: undefined,
        });
    }

    renderEditDialog():ReactNode {
        if (this.state.editingModel === undefined) return null;
        return (
            <EditModel
                busy={this.props.loading}
                fields={fields}
                modelData={this.state.editingModel}
                updateField={this.handleModelEditFieldUpdate.bind(this)}
                cancelEdit={this.handleModelEditCancel.bind(this)}
                saveEdit={this.handleModelEditSave.bind(this)}
                type={"Domain"}
            />
        )
    }

    render() {
        return (
            <Paper id="domains">
                <Typography variant="title">Users</Typography>
                <Button
                    children="Create"
                    onClick={this.handleCreate.bind(this)}
                    variant={"raised"}
                />
                {this.renderEditDialog()}
                <Table
                    context={this}
                    columns={columns}
                    data={this.props.tableData}
                    fetchFunc={this.handleFetch.bind(this)}
                    offset={this.props.offset}
                    limit={this.props.limit}>
                </Table>
            </Paper>
        );
    }
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
