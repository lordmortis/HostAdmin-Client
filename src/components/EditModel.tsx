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


interface Field {
    field: string,
    header: string,
    type: string,
}

interface FieldUpdateFunc {
    (field:string, newValue:any):void;
}

interface Props {
    busy: boolean;
    type: string;
    fields: Array<Field>;
    modelData: any;
    updateField: FieldUpdateFunc;
    cancelEdit: ()=>void;
    saveEdit: ()=>void;
}

interface IState {

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

function renderField(disabled: boolean, modelData: any, update: FieldUpdateFunc, fieldData: Field):ReactNode {

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

export default class EditModel extends React.Component<Props, IState> {

    private renderFields():ReactNode {
        const { fields, updateField, modelData, busy } = this.props;
        return fields.map(renderField.bind(null, busy, modelData, updateField));
    }

    render() {
        const { modelData, type, cancelEdit, saveEdit } = this.props;

        const newRecord = modelData["id"] === undefined;

        const title = newRecord ? `Create ${type}` : `Editing ${type}`


        return (
            <Dialog open={true}>
                <DialogTitle>{title}</DialogTitle>
                <DialogContent>
                    {this.renderFields()}
                </DialogContent>
                <DialogActions>
                    <Button children={"Save"} color={"primary"} onClick={saveEdit} variant={"contained"}/>
                    <Button children={"Cancel"} color={"secondary"} onClick={cancelEdit} variant={"contained"}/>
                </DialogActions>
            </Dialog>
        )
    }
}