import React, {ReactNode} from 'react';
import { Store } from 'redux'
import { Provider as ReduxProvider, connect } from 'react-redux';

import CssBaseline from '@material-ui/core/CssBaseline';

import {State as StoreState} from './store';

import AppBar from './components/AppBar';
import DomainsPage from './pages/Domains';
import LoginPage from './pages/Login';

interface IProps {
    store: Store<StoreState>,
}

interface PropsFromState {
    auth?: boolean,
}

function renderPages(auth?: boolean) : ReactNode {
    if (auth) return <DomainsPage/>;
    return <LoginPage/>;
}

const App: React.FC<IProps> = (props: IProps & PropsFromState) => {
    return (
        <div>
            <ReduxProvider store={props.store}>
                <CssBaseline/>
                <div className="App">
                    <AppBar>HostAdmin</AppBar>
                    {renderPages(props.auth)}
                </div>
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
