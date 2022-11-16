import { all , call } from 'redux-saga/effects' // all allows us to resolve effects in parallel, call allows calling fns
import userSagas from './User/user.sagas' //import all the sagas to merge them into this rootSaga. this thing will listen for everything on aggregate
import productsSagas from './Products/products.sagas'


// generator function
export default function* rootSaga() {
    yield all([call(userSagas), 
    call(productsSagas)])
} //pass the sagas you want to this array

// the root saga is then passed to the createStore, and therefore will keep the store up to date with all of the asynchronous activity covered by the individual sagas


