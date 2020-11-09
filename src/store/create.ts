import { Store, createStore, applyMiddleware, compose } from "redux"
import { createBrowserHistory } from 'history'
import { routerMiddleware } from "connected-react-router";
import createSagaMiddleware from 'redux-saga'

import * as AppStore from './index'

export const history = createBrowserHistory()

export default function(initialState?: AppStore.State):Store<AppStore.State> {
    const sagaMiddleware = createSagaMiddleware()
    const combinedReducer = AppStore.createRootReducer(history);
    const appliedMiddleware = applyMiddleware(
        routerMiddleware(history),
        sagaMiddleware,
    );

    if (process.env.NODE_ENV === 'production') {
        const store = createStore(combinedReducer, initialState, appliedMiddleware);
        sagaMiddleware.run(AppStore.rootSaga);
        return store
    }

    // @ts-ignore
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

    const store = createStore(
        combinedReducer, initialState, composeEnhancers(appliedMiddleware)
    );

    sagaMiddleware.run(AppStore.rootSaga);

    // @ts-ignore
    if (module.hot) {
        // @ts-ignore
        module.hot.accept('./', () => {
            const nextReducer = combinedReducer
            store.replaceReducer(nextReducer)
        })
    }

    return store;
}