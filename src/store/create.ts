import { Store, createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from 'redux-saga'

import * as AppStore from './index'

export default function(initialState?: AppStore.State):Store<AppStore.State> {
    const sagaMiddleware = createSagaMiddleware()
    const combinedReducer = AppStore.createRootReducer();
    const appliedMiddleware = applyMiddleware(
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