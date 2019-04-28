import React from 'react';

import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

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

interface IProps {

}

interface IState {
    username: string,
    password: string,
}

class Login extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            username:"",
            password: "",
        }
    }

    private handleSubmit(event:React.FormEvent): void {
        event.preventDefault();
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

        const valid = isValid(this.state);
        const busy = false;

        return (
            <Paper id="login">
                <Typography variant="title">Login</Typography>
                <form className="form" autoComplete="false" onSubmit={this.handleSubmit}>
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
                    {renderLogin(valid, busy)}
                </form>
            </Paper>
        )
    }
}


export default Login;