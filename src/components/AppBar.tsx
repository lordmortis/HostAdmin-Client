import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import Divider from "@material-ui/core/Divider";
import Drawer  from "@material-ui/core/Drawer";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from '@material-ui/icons/Menu';
import MenuItem from "@material-ui/core/MenuItem";
import MUIAppBar from '@material-ui/core/AppBar'
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

import * as Actions from '../store/auth/actions'
import { State as StoreState } from '../store/index'

interface PropsFromState {
    username?: string
}

interface PropsFromDispatch {
    doLogout: typeof Actions.Logout
}

interface PropsFromReact {
    children: React.ReactNode
}

type AllProps = PropsFromState & PropsFromDispatch & PropsFromReact & RouteComponentProps

interface IState {
    menuVisible: boolean
}

class AppBar extends React.Component<AllProps, IState> {
    constructor(props: AllProps) {
        super(props);

        this.state = {
            menuVisible: false,
        }
    }

    private renderMenuIcon(): React.ReactNode {
        const { username } = this.props;

        if (username === undefined) return null;
        return (
            <IconButton color={"inherit"} aria-label={"Menu"} onClick={this.handleMenuToggle.bind(this)}>
                <MenuIcon/>
            </IconButton>
        )
    }

    private renderSectionButton(path: string, name: string): React.ReactNode {
        const absPath = `/${path}`;
        const showing = this.props.location.pathname.startsWith(absPath);
        const urlPush = () => {
            this.props.history.push(absPath);
            this.setState({menuVisible: false});
        }
        return (
            <MenuItem key={path} disabled={showing} onClick={urlPush}>
                {name}
            </MenuItem>
        );
    }

    private renderMenu(): React.ReactNode {
        const { menuVisible }: Readonly<IState> = this.state;

        const { username }: Readonly<AllProps> = this.props;

        return (
            <Drawer anchor={"left"} open={menuVisible} onClose={this.handleMenuToggle.bind(this)}>
                <Typography key={"title"} align={"center"} variant={"title"} children={"Menu"}/>
                <Typography key={"username"} align={"center"} children={username}/>
                <Divider/>
                {this.renderSectionButton("domains", "Domains")}
                {this.renderSectionButton("users", "Users")}
                <Divider/>
                <MenuItem key={"logout"} onClick={this.handleLogout.bind(this)} children={"Log Out"}/>
            </Drawer>
        )
    }

    private handleCloseMenu() {
        this.setState({...this.state, menuVisible: false});
    }

    private handleMenuToggle() {
        this.setState({...this.state, menuVisible: !this.state.menuVisible});
    }

    private handleLogout() {
        this.handleCloseMenu();
        this.props.doLogout();
    }

    render() {
        return (
            <div>
                <div>
                    <MUIAppBar position="static">
                        <Toolbar>
                            {this.renderMenuIcon()}
                            <Typography variant="h6" color="inherit">
                                {this.props.children}
                            </Typography>
                        </Toolbar>
                    </MUIAppBar>
                </div>
                <div>
                    {this.renderMenu()}
                </div>
            </div>
        );
    }
}

function mapStateToProps(state: StoreState):PropsFromState {
    return {
        username: state.auth.username,
    }
}

function mapDispatchToProps(dispatch: Dispatch):PropsFromDispatch {
    return {
        doLogout: () => dispatch(Actions.Logout()),
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AppBar));