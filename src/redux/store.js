import { createStore, applyMiddleware } from 'redux'
import { rootReducer } from './reducers'
import thunk from 'redux-thunk'
import createSagaMiddleware from 'redux-saga'
import rootSaga from './sagas/rootSaga'

const sagaMiddleware = createSagaMiddleware()

const middleware = [thunk, sagaMiddleware]

export const configureStore = () => {
    const store = createStore(rootReducer, applyMiddleware(...middleware))

    sagaMiddleware.run(rootSaga)

    return store
}