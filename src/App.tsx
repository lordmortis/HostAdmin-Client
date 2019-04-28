import React from 'react';
import { Store } from 'redux'
import { Provider as ReduxProvider } from 'react-redux';

import CssBaseline from '@material-ui/core/CssBaseline';

import {State as StoreState} from './store';

import AppBar from './components/AppBar';
import LoginPage from './pages/Login';

import './App.css';

interface IProps {
    store: Store<StoreState>,
}

const App: React.FC<IProps> = (props: IProps) => {
    console.log("props:");
    console.log(props);

    return (
        <div>
            <ReduxProvider store={props.store}>
                <CssBaseline/>
                <div className="App">
                    <AppBar>HostAdmin</AppBar>
                    <LoginPage/>
                </div>
            </ReduxProvider>
        </div>
    );
};

export default App;
