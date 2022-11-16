import {createStore, applyMiddleware}  from 'redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import createSagaMiddle from 'redux-saga'

import rootReducer from './rootReducer'
import rootSaga from './rootSaga'

const sagaMiddleware = createSagaMiddle() //imported from redux-saga, 

export const middlewares = [sagaMiddleware, thunk, logger ] // pass sagaMiddleware in here

export const store = createStore(rootReducer, applyMiddleware(...middlewares)) // store now uses the saga
sagaMiddleware.run(rootSaga) 

export default store