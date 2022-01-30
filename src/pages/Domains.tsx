import React, { ReactNode } from "react";
import { State as StoreState } from "../store";
import { Dispatch } from "redux";
import { connect } from "react-redux";

import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

import * as Actions from '../store/domains/actions'
import { DomainModel as TableModel } from '../api/Domains'

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
        field: "name", header: "Domain Name"
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
    { field: "name", header: "Domain Name", type: "string" },
];

class Domains extends React.PureComponent<AllProps, IState> {
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
        this.props.doSave({
            // @ts-ignore
            id: newValues["id"],
            // @ts-ignore
            name: newValues["name"],
        }, 0, 10);
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

        console.log("Rendering Domains Page");
        console.log(this.state);

        return (
            <Paper id="domains">
                <Typography variant="h1">Domains</Typography>
                <Button
                    children="Create"
                    onClick={this.handleCreate.bind(this)}
                    variant={"contained"}
                />
                {this.renderEditDialog()}
                <Table
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
        loading: state.domains.busy,
        tableData: state.domains.data,
        totalRecords: state.domains.totalLength,
        limit: state.domains.limit,
        offset: state.domains.offset,
    }
}

function mapDispatchToProps(dispatch: Dispatch):PropsFromDispatch {
    return {
        doFetch: (offset: number, limit: number) => dispatch(Actions.Fetch(offset, limit)),
        doSave: (data: TableModel, offset: number, limit: number) => dispatch(Actions.Save(data, offset, limit)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Domains);
