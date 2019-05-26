import * as SagaEffects from 'redux-saga/effects'

import * as Actions from './actions'
import * as Types from './types'

import * as API from '../../api/Domains'

function* handleFetch(action: ReturnType<typeof Actions.Fetch>) {
    try {
        const { offset, limit } = action.payload;
        const data = yield SagaEffects.call(API.List, offset, limit);
        yield SagaEffects.put(Actions.Fetched(data.data, data.totalRecords))
    } catch (error) {
        yield SagaEffects.put(Actions.FetchError(error));
    }
}

function* watchFetch() {
    yield (SagaEffects.takeLatest(Types.ActionTypes.FETCH, handleFetch));
}

export function* Sagas() {
    yield SagaEffects.all([
        SagaEffects.fork(watchFetch),
    ]);
}