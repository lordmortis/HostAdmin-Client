import * as SagaEffects from 'redux-saga/effects'
import * as Actions from './actions'
import * as Types from './types'

function* handleLogin(action: ReturnType<typeof Actions.Login>) {
    console.log(action.payload.username);
    console.log(action.payload.password);
    yield
}

function* watchFetchRequest() {
    yield (SagaEffects.takeLatest(Types.ActionTypes.LOGIN, handleLogin));
}

export function* Sagas() {
    yield SagaEffects.all([
        SagaEffects.fork(watchFetchRequest),
    ]);
}