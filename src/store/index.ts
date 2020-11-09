import { combineReducers, Dispatch, Action, AnyAction, Reducer } from 'redux'
import * as SagaEffects from 'redux-saga/effects'
import { connectRouter, RouterState } from "connected-react-router";
import { History } from "history";

import * as Auth from './auth'
import * as Domains from './domains'


export interface State {
    router: RouterState,
    auth: Auth.State,
    domains: Domains.State,
}

export interface ConnectedReduxProps<A extends Action = AnyAction> {
    dispatch: Dispatch<A>
}

export const createRootReducer = (history: History):Reducer<State, AnyAction> =>
    combineReducers({
        router: connectRouter(history),
        auth: Auth.Reducer,
        domains: Domains.Reducer,
    })

export function* rootSaga() {
    yield SagaEffects.all([
        SagaEffects.fork(Auth.Sagas),
        SagaEffects.fork(Domains.Sagas)
    ])
}