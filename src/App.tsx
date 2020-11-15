import React, {ReactNode} from 'react';
import { Store } from 'redux'
import { Provider as ReduxProvider, connect } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router'
import { History } from "history";
import { Route, Switch } from 'react-router-dom';

import CssBaseline from '@material-ui/core/CssBaseline';

import {State as StoreState} from './store';

import AppBar from './components/AppBar';
import DomainsPage from './pages/Domains';
import LoginPage from './pages/Login';
import UsersPage from './pages/Users';

interface IProps {
    store: Store<StoreState>
    history: History
}

interface PropsFromState {
    auth?: boolean,
}

function renderPages(auth?: boolean) : ReactNode {
    if (!auth) {
        return <LoginPage/>;
    }

    const routes = [];

    routes.push(<Route key="domains" path="/domains" component={DomainsPage}/>);
    routes.push(<Route key="users" path="/users" component={UsersPage}/>);

    return (
        <Switch>
            {routes}
        </Switch>
    )
}

const App: React.FC<IProps> = (props: IProps & PropsFromState) => {
    return (
        <div>
            <ReduxProvider store={props.store}>
                <ConnectedRouter history={props.history}>
                    <CssBaseline/>
                    <div className="App">
                        <AppBar>Admin System</AppBar>
                        {renderPages(props.auth)}
                    </div>
                </ConnectedRouter>
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
