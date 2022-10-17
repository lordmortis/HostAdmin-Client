import React from "react";

import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

import EditModel, { Field } from '../components/EditModel'
import Table, { Column } from "../components/Table"

type FetchFunc = (offset: number, limit: number) => any;
type SaveFunc<Type> = (data: Type, offset: number, limit: number) => any;

interface PropsFromState<Type> {
    loading: boolean;
    tableData: Array<Type>;
    totalRecords: number,
    offset: number,
    limit: number,
}

interface PropsFromDispatch<Type> {
    doFetch: FetchFunc;
    doSave: SaveFunc<Type>;
}

interface ConfigProps<Type> {
    pageName: string,
    columns: Array<Column>;
    fields: Array<Field>;
    defaultModel: Type
}

type AllProps<Type> = ConfigProps<Type> & PropsFromState<Type> & PropsFromDispatch<Type>;

function renderEditDialog<Type>(
    fields:Array<Field>,
    editingModel:Type | undefined,
    setEditingModel:(model:Type | undefined) => void,
    handleSave: SaveFunc<Type>,
    loading:boolean):React.ReactNode {
    if (editingModel == null) return null;

    const onUpdateField = (field: string, newValue: any) => {
        const newModel = Object.assign({}, editingModel);
        // @ts-ignore
        newModel[field] = newValue;
        setEditingModel(newModel);
    }

    const onCancelEdit = () => {
        setEditingModel(undefined);
    }

    const onSave = () => {
        if (editingModel == null) return;
        handleSave(editingModel, 0, 10);
        setEditingModel(undefined);
    }

    return (
        <EditModel
            busy={loading}
            fields={fields}
            modelData={editingModel}
            updateField={onUpdateField}
            cancelEdit={onCancelEdit}
            saveEdit={onSave}
            type={"Domain"}
        />
    )
}

function EditPage<Type>(props:AllProps<Type>) {
    const [editingModel, setEditingModel] = React.useState<Type|undefined>(undefined);

    const onCreate = (event: React.FormEvent) => {
        event.preventDefault()
        setEditingModel(props.defaultModel)
    }

    return (
        <Paper id="domains">
            <Typography variant="h1">{props.pageName}</Typography>
            <Button
                children="Create"
                onClick={onCreate}
                variant={"contained"}
            />
            {renderEditDialog<Type>(props.fields, editingModel, setEditingModel, props.doSave, props.loading)}
            <Table
                columns={props.columns}
                data={props.tableData}
                fetchFunc={(offset:number, limit:number) => props.doFetch(offset, limit)}
                offset={props.offset}
                limit={props.limit}
                totalRecords={props.totalRecords}/>
        </Paper>
    );
}

export default EditPage;
