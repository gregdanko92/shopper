import { all , call } from 'redux-saga/effects' // all allows us to resolve effects in parallel, call allows calling fns
import userSagas from './User/user.sagas'

export default function* rootSaga() {
    yield all([call(userSagas)])
}


