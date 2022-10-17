import React from 'react';
import { Dispatch as ReduxDispatch } from 'redux';
import { connect } from 'react-redux';

import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import * as Actions from '../store/auth/actions'
import { State as StoreState } from '../store/index'

function isValid(username: string, password: string): boolean {
    if (username.length < 3) return false;
    if (password.length < 4) return false;
    return true;
}

function renderLogin(valid: boolean, busy: boolean): React.ReactNode {
    const text = busy ? "Logging In..." : "Login";
    return (
        <Button
            type="submit"
            children={text}
            disabled={!valid || busy}
            variant="contained"
        />
    )
}

function renderErrors(errors: ReadonlyArray<string>): React.ReactNode {
    if (errors.length === 0) return null;
    return (
        <Typography variant={"caption"} className={"errors"}>
            {errors.join(",")}
        </Typography>
    )
}

interface PropsFromState {
    auth: boolean,
    busy: boolean,
    errors: ReadonlyArray<string>,
}

interface PropsFromDispatch {
    doLogin: typeof Actions.Login
}

type AllProps = PropsFromState & PropsFromDispatch;

interface IState {
    username: string,
    password: string,
}

function handleChange(setter:React.Dispatch<React.SetStateAction<string>>, event:React.ChangeEvent<HTMLInputElement>):void {
    setter(event.target.value);
}

const Login: React.FC<AllProps> = (props:AllProps) => {
    const { busy, errors, doLogin } = props;

    const [ currentUsername, setUsername ] = React.useState("");
    const [ currentPassword, setPassword ] = React.useState("");

    const doSubmit = (event:React.FormEvent) => {
        event.preventDefault();
        doLogin(currentUsername, currentPassword);
    }

    return (
        <Paper id="login">
            <Typography variant="h1">Login</Typography>
            <form className="form" autoComplete="false" onSubmit={doSubmit}>
                <TextField
                    id="username"
                    label="Username"
                    value={currentUsername}
                    onChange={handleChange.bind(null,setUsername)}
                    placeholder="username"
                    margin="normal"
                    type="text"
                />
                <TextField
                    id="password"
                    label="Password"
                    value={currentPassword}
                    onChange={handleChange.bind(null,setPassword)}
                    margin="normal"
                    type="password"
                />
                {renderLogin(isValid(currentUsername, currentPassword), busy)}
            </form>
            {renderErrors(errors)}
        </Paper>
    )
}

function mapStateToProps(state: StoreState):PropsFromState {
    return {
        busy: state.auth.busy,
        auth: state.auth.sessionID !== undefined,
        errors: state.auth.errors,
    }
}

function mapDispatchToProps(dispatch: ReduxDispatch):PropsFromDispatch {
    return {
        doLogin: (username, password) => dispatch(Actions.Login(username, password))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)