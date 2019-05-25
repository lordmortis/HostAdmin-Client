import * as SagaEffects from 'redux-saga/effects'
import { Interval } from 'luxon'

import * as Actions from './actions'
import * as Types from './types'

import * as API from '../../api/Auth'

function* handleLogin(action: ReturnType<typeof Actions.Login>) {
    try {
        const data = yield SagaEffects.call(API.Login, action.payload.username, action.payload.password);
        yield SagaEffects.put(Actions.KeepAlive(data.expiry));
        yield SagaEffects.put(Actions.LoggedIn(data.sessionID, data.expiry));
    } catch (error) {
        yield SagaEffects.put(Actions.LoginError(error));
    }
}

function* handleKeepAlive(action: ReturnType<typeof Actions.StillAlive>) {
    try {
        const now = new Date();
        if (now > action.payload.expiry) {
            yield SagaEffects.put(Actions.Logout());
            return;
        }
        const interval = Interval.fromDateTimes(new Date(), action.payload.expiry);
        yield SagaEffects.delay(interval.toDuration().milliseconds * 0.8);
        const data = yield SagaEffects.call(API.SessionKeepalive);
        yield SagaEffects.put(Actions.StillAlive(data.expiry));
        yield SagaEffects.put(Actions.KeepAlive(data.expiry));
    } catch(error) {
        console.log(error);
        yield SagaEffects.put(Actions.Logout());
    }
}

function* handleLogout() {
    try {
        yield SagaEffects.call(API.Logout);
        yield SagaEffects.put(Actions.LoggedOut());
    } catch(error) {
        console.log(error);
        yield SagaEffects.put(Actions.LoggedOut());
    }
}

function* watchLoginRequest() {
    yield (SagaEffects.takeLatest(Types.ActionTypes.LOGIN, handleLogin));
}

function* watchKeepAlive() {
    yield (SagaEffects.takeLatest(Types.ActionTypes.KEEP_ALIVE, handleKeepAlive));
}

function* watchLogout() {
    yield (SagaEffects.takeLatest(Types.ActionTypes.LOGOUT, handleLogout));
}

export function* Sagas() {
    yield SagaEffects.all([
        SagaEffects.fork(watchLoginRequest),
        SagaEffects.fork(watchKeepAlive),
        SagaEffects.fork(watchLogout),
    ]);
}