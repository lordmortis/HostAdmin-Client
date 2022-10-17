import React, {ReactNode} from 'react';
import { Store } from 'redux'
import { Provider as ReduxProvider, connect } from 'react-redux';
import { History } from "history";
import {Routes, Route, useRoutes, BrowserRouter} from 'react-router-dom';

import CssBaseline from '@material-ui/core/CssBaseline';

import {State as StoreState} from './store';

import AppBar from './components/AppBar';
import DomainsPage from './pages/Domains';
import DomainPage from './pages/Domain';
import LoginPage from './pages/Login';
import UsersPage from './pages/Users';

const appRoutes = [
    {path: "/domains", element: <DomainsPage/>},
    {path: "/domain/:id", element: <DomainPage/>},
    {path: "/users", element: <UsersPage/>}
]

interface IProps {
    store: Store<StoreState>
    history: History
}

interface PropsFromState {
    auth?: boolean,
}

interface RouterProps {
    auth?: boolean
}

const AppRoutes:React.FC<RouterProps> = (props:PropsFromState) => {
    return (useRoutes(appRoutes))
}

const App: React.FC<IProps> = (props: IProps & PropsFromState) => {
    return (
        <div>
            <ReduxProvider store={props.store}>
                <BrowserRouter>
                    <CssBaseline/>
                    <div className="App">
                        <AppBar>Admin System</AppBar>
                        {props.auth ? <AppRoutes/> : <LoginPage/>}
                    </div>
                </BrowserRouter>
            </ReduxProvider>
        </div>
    );
};

function mapStateToProps(state: StoreState):PropsFromState {
    return {
        auth: state.auth.sessionID != null,
    }
}

export default connect(mapStateToProps)(App);
