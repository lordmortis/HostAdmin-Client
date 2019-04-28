import { Store, createStore, applyMiddleware, compose } from "redux";

import * as AppStore from './index'

export default function(initialState?: AppStore.State):Store<AppStore.State> {
    const combinedReducer = AppStore.createRootReducer();

    if (process.env.NODE_ENV === 'production') {
        return createStore(combinedReducer, initialState);
    }

    // @ts-ignore
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

    const store = createStore(
        combinedReducer, initialState, composeEnhancers()
    );

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