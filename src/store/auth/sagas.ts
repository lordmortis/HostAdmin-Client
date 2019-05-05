import * as SagaEffects from 'redux-saga/effects'
import * as Actions from './actions'
import * as Types from './types'

import * as API from '../../api/Auth'

function* handleLogin(action: ReturnType<typeof Actions.Login>) {
    try {
        const data = yield SagaEffects.call(API.Login, action.payload.username, action.payload.password);
        yield SagaEffects.put(Actions.LoggedIn(data.sessionID, data.expiry));
    } catch (error) {
        yield SagaEffects.put(Actions.LoginError(error));
    }
}

function* watchFetchRequest() {
    yield (SagaEffects.takeLatest(Types.ActionTypes.LOGIN, handleLogin));
}

export function* Sagas() {
    yield SagaEffects.all([
        SagaEffects.fork(watchFetchRequest),
    ]);
}