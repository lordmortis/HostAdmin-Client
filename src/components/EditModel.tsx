import React, { ReactNode } from "react";

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from "@material-ui/core/Typography";

export interface Field {
    field: string,
    header: string,
    type: string,
}

export interface FieldUpdateFunc {
    (field:string, newValue:any):void;
}

interface IProps {
    busy: boolean;
    type: string;
    fields: Array<Field>;
    modelData: any;
    updateField: FieldUpdateFunc;
    cancelEdit: ()=>void;
    saveEdit: ()=>void;
}

function updateFromFieldWithValue(update: FieldUpdateFunc, field:string, event: React.ChangeEvent<HTMLTextAreaElement>):void {
    if (event.preventDefault !== undefined) event.preventDefault();
    update(field, event.target.value);
}

function updateFromCheckboxField(update: FieldUpdateFunc, field:string, event: React.ChangeEvent<HTMLInputElement>, checked: boolean):void {
    if (event.preventDefault !== undefined) event.preventDefault();
    console.log(`checked? ${checked}`)
    update(field, checked);
}

function renderField(disabled: boolean, modelData: any, update: FieldUpdateFunc, fieldData: Field):React.ReactNode {

    const fieldValue = modelData[fieldData.field];

    let data = null;

    switch(fieldData.type) {
        case "bool":
            data = [];
            data.push(
                <Checkbox
                key="checkbox"
                id={fieldData.field}
                disabled={disabled}
                checked={fieldValue === undefined ? "" : fieldValue}
                onChange={updateFromCheckboxField.bind(null, update, fieldData.field)}
            />);
            data.push(
                <FormLabel
                    key="label"
                    id={fieldData.field}
                    disabled={disabled}
                    children={fieldData.header}
                />);
            break;
        case "string":
            data = <TextField
                id={fieldData.field}
                disabled={disabled}
                label={fieldData.header}
                type="text"
                value={fieldValue === undefined ? "" : fieldValue}
                onChange={updateFromFieldWithValue.bind(null, update, fieldData.field)}
            />;
            break;
        case "password":
            data = <TextField
                id={fieldData.field}
                disabled={disabled}
                label={fieldData.header}
                type="password"
                value={fieldValue === undefined ? "" : fieldValue}
                onChange={updateFromFieldWithValue.bind(null, update, fieldData.field)}
            />;
            break;
        default:
            data = <Typography children={`Unknown Field type ${fieldData.type}`}/>
            break;
    }
    return <FormControl key={fieldData.field} children={data}/>;
}

function renderFields(props:IProps):React.ReactNode {
    return props.fields.map(renderField.bind(null, props.busy, props.modelData, props.updateField));
}

const EditModel: React.FC<IProps> = (props:IProps) => {

    const newRecord = props.modelData["id"] === undefined;
    const title = newRecord ? `Create ${props.type}` : `Editing ${props.type}`

    return (
        <Dialog open={true}>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                {renderFields(props)}
            </DialogContent>
            <DialogActions>
                <Button children={"Save"} color={"primary"} onClick={props.saveEdit} variant={"contained"}/>
                <Button children={"Cancel"} color={"secondary"} onClick={props.cancelEdit} variant={"contained"}/>
            </DialogActions>
        </Dialog>
    )
}

export default EditModel;