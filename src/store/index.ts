import { combineReducers, Dispatch, Action, AnyAction, Reducer } from 'redux'
import * as SagaEffects from 'redux-saga/effects'

import * as Auth from './auth'
import * as Domains from './domains'

export interface State {
    auth: Auth.State,
    domains: Domains.State,
}

export interface ConnectedReduxProps<A extends Action = AnyAction> {
    dispatch: Dispatch<A>
}

export const createRootReducer = ():Reducer<State, AnyAction> =>
    combineReducers({
        auth: Auth.Reducer,
        domains: Domains.Reducer,
    })

export function* rootSaga() {
    yield SagaEffects.all([
        SagaEffects.fork(Auth.Sagas),
        SagaEffects.fork(Domains.Sagas)
    ])
}