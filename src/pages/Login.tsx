import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import * as Actions from '../store/auth/actions'
import { State as StoreState } from '../store/index'

function isValid(state:IState): boolean {
    if (state.username.length < 3) return false;
    if (state.password.length < 4) return false;
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

class Login extends React.Component<AllProps, IState> {
    constructor(props: AllProps) {
        super(props);

        this.state = {
            username:"",
            password: "",
        }
    }

    private handleSubmit(event:React.FormEvent): void {
        event.preventDefault();
        this.props.doLogin(this.state.username, this.state.password);
    }

    private handleChange(field: string, event:React.ChangeEvent<HTMLInputElement>): void {
        switch (field) {
            case "username":
                this.setState({username: event.target.value});
                break;
            case "password":
                this.setState({password: event.target.value});
                break;
            default:
                console.error("Unknown field: " + field);
        }
    }

    render() {

        const { busy, errors } = this.props;

        return (
            <Paper id="login">
                <Typography variant="h1">Login</Typography>
                <form className="form" autoComplete="false" onSubmit={this.handleSubmit.bind(this)}>
                    <TextField
                        id="username"
                        label="Username"
                        value={this.state.username}
                        onChange={this.handleChange.bind(this,'username')}
                        placeholder="username"
                        margin="normal"
                        type="text"
                    />
                    <TextField
                        id="password"
                        label="Password"
                        value={this.state.password}
                        onChange={this.handleChange.bind(this,'password')}
                        margin="normal"
                        type="password"
                    />
                    {renderLogin(isValid(this.state), busy)}
                </form>
                {renderErrors(errors)}
            </Paper>
        )
    }
}

function mapStateToProps(state: StoreState):PropsFromState {
    return {
        busy: state.auth.busy,
        auth: state.auth.sessionID !== undefined,
        errors: state.auth.errors,
    }
}

function mapDispatchToProps(dispatch: Dispatch):PropsFromDispatch {
    return {
        doLogin: (username, password) => dispatch(Actions.Login(username, password))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)