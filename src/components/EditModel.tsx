import React, { ReactNode } from "react";

import Button from '@material-ui/core/Button';
import Checkbox from "@material-ui/core/Checkbox";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import TextField from '@material-ui/core/TextField';
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

function updateField(update: FieldUpdateFunc, field:string, event: any):void {
    if (event.preventDefault !== undefined) event.preventDefault();
    switch(event.target.type) {
        case "text":
        case "password":
            update(field, event.target.value);
            break;
        case "checkbox":
            update(field, event.target.checked);
            break;
        default:
            console.error(`Unable to update field ${field} unknown field type ${event.target.type}`);
            console.error(event.target);
    }
}

function renderFormControl(fieldData: Field, child: ReactNode):ReactNode {
    return <FormControl key={fieldData.field} children={child}/>;
}

function renderField(disabled: boolean, modelData: any, update: FieldUpdateFunc, fieldData: Field):ReactNode {

    const fieldValue = modelData[fieldData.field];

    switch(fieldData.type) {
        case "boolean":
            return <FormControlLabel
                    control={
                        <Checkbox
                            checked={fieldValue === undefined ? false : fieldValue}
                            onChange={updateField.bind(null, update, fieldData.field)}
                            color="primary"
                        />
                    }
                    label={fieldData.header}
                />;
        case "string":
        case "password":
            return renderFormControl(
                fieldData,
                <TextField
                    id={fieldData.field}
                    disabled={disabled}
                    label={fieldData.header}
                    type={fieldData.type === "password" ? "password" : "text"}
                    value={fieldValue === undefined ? "" : fieldValue}
                    onChange={updateField.bind(null, update, fieldData.field)}
                />);
        default:
            return <Typography children={`Unknown Field type ${fieldData.type}`}/>
    }

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