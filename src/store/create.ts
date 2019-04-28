import { Store, createStore, applyMiddleware, compose } from "redux";

import * as AppStore from './index'

export default function(initialState?: AppStore.State):Store<AppStore.State> {
    if (process.env.NODE_ENV === 'production') {
        return createStore(AppStore.createRootReducer(), initialState);
    }

    // @ts-ignore
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

    return createStore(
        AppStore.createRootReducer(), initialState, composeEnhancers()
    );
}