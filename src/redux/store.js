import { applyMiddleware, createStore } from 'redux'
import { rootReducer } from './reducers'
import thunk from 'redux-thunk';
import createSagaMiddleware from "redux-saga";
import rootSaga from "./sagas/rootSaga";

const sagaMiddleware = createSagaMiddleware();

const middlewares = [thunk, sagaMiddleware]

export const configureStore = () => {
    const store = createStore(
        rootReducer,
        applyMiddleware(...middlewares)
    )

    sagaMiddleware.run(rootSaga);

    return store
}