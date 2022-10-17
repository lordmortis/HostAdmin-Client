import React, {useState} from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import {useNavigate, useLocation, Location} from 'react-router-dom';

import Divider from "@material-ui/core/Divider";
import Drawer  from "@material-ui/core/Drawer";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from '@material-ui/icons/Menu';
import MUIAppBar from '@material-ui/core/AppBar'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

import { ExitToApp as IconExitToApp, People as IconPeople, Dns as IconDNS } from '@material-ui/icons'

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

type AllProps = PropsFromState & PropsFromDispatch & PropsFromReact

interface INavigation {
    navigate: Function
    currentLocation: Location
}

interface IMenuState {
    menuVisibility: boolean
    setMenuVisibility: Function
}

interface ISectionButton {
    path: string
    name: string
    icon?: React.ReactNode
}

const menuItems:ISectionButton[] = [
    {path: "/domains", name: "Domains", icon: <IconDNS/>},
    {path: "/users", name: "Users", icon: <IconPeople/>},
]

function renderSectionButton(state:INavigation & IMenuState, buttonData:ISectionButton): React.ReactNode {
    const children = []
    const selected = state.currentLocation.pathname.startsWith(buttonData.path)

    const urlPush = () => {
        state.setMenuVisibility(false);
        if (selected) return;
        state.navigate(buttonData.path);
    }

    if (buttonData.icon != null) {
        children.push(<ListItemIcon>{buttonData.icon}</ListItemIcon>)
    }

    children.push(<ListItemText children={buttonData.name}/>)

    return (
        <ListItem button key={buttonData.path} selected={selected} children={children} onClick={urlPush}/>
    );
}

function renderMenuIcon(menuState:IMenuState, authenticated:boolean): React.ReactNode {
    if (!authenticated) return null;

    const onClick = () => {
        menuState.setMenuVisibility(true);
    }

    return (
        <IconButton color={"inherit"} aria-label={"Menu"} onClick={onClick}>
            <MenuIcon/>
        </IconButton>
    )
}

function renderMenu(menuState:IMenuState, navigationState:INavigation, doLogout:Function, username:string | undefined): React.ReactNode {
    const onClose = () => {
        menuState.setMenuVisibility(false)
    }

    const onLogout = () => {
        navigationState.navigate("/")
        doLogout();
    }

    return (
        <Drawer anchor={"left"} open={menuState.menuVisibility} onClose={onClose}>
            <Typography key={"title"} align={"center"} variant={"h3"} children={"Menu"}/>
            <Typography key={"username"} align={"center"} children={username}/>
            <Divider/>
            <List>
                {menuItems.map((item) => renderSectionButton({...menuState, ...navigationState}, item))}
                <ListItem button key={"logout"} onClick={onLogout}>
                    <ListItemIcon><IconExitToApp/></ListItemIcon>
                    <ListItemText>Logout</ListItemText>
                </ListItem>
            </List>
        </Drawer>
    )
}

const AppBar: React.FC<AllProps> = (props: AllProps) => {
    const [ menuVisible, setMenuVisible ] = useState(false);
    const menuState:IMenuState = {
        menuVisibility: menuVisible,
        setMenuVisibility: setMenuVisible
    }

    const navigationState:INavigation = {
        navigate: useNavigate(),
        currentLocation: useLocation()
    }

    const { username } = props;

    return (
        <div>
            <div>
                <MUIAppBar position="static">
                    <Toolbar>
                        {renderMenuIcon(menuState, username != null)}
                        <Typography variant="h6" color="inherit">
                            {props.children}
                        </Typography>
                    </Toolbar>
                </MUIAppBar>
            </div>
            <div>
                {renderMenu(menuState, navigationState, props.doLogout, username)}
            </div>
        </div>
    );
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

export default connect(mapStateToProps, mapDispatchToProps)(AppBar);