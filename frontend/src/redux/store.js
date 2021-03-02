import {createStore,applyMiddleware} from "redux"
import createSagaMiddleware from 'redux-saga'

import { watchLoggedInUser } from './sagas/Saga'
import reducer from "./reducer"

const sagaMiddleware = createSagaMiddleware()

const store=createStore(reducer,applyMiddleware(sagaMiddleware))
sagaMiddleware.run(watchLoggedInUser)

export default store