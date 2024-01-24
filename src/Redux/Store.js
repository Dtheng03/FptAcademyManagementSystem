import Reducer from "./Reducer";
import MiddleWare from './MiddleWare'
import createSagaMiddleware from 'redux-saga'
import { applyMiddleware, legacy_createStore, combineReducers } from 'redux'

const sagaMiddleware = createSagaMiddleware()

const allReducer = combineReducers({
    userStore: Reducer,
})

export default legacy_createStore(allReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(MiddleWare)