import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import * as serviceWorker from './serviceWorker';

import App from './App';
import createStore from './store/create';

import * as Auth from './api/Auth'
import * as AuthActions from './store/auth/actions'

const store = createStore();

const savedSession = Auth.SavedSession();
if (savedSession != null) {
    const username = Auth.SavedUsername();
    if (username != null) {
        store.dispatch(AuthActions.LoggedIn(savedSession.sessionID, savedSession.expiry, username));
        store.dispatch(AuthActions.KeepAlive(savedSession.expiry));
    }
}

ReactDOM.render(<App store={store}/>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
