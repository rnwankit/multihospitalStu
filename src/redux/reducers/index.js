import { combineReducers } from "redux";
import { Counter } from '../reducers/counter.reducer'
import { authReducer } from "./auth.reducer";

export const rootReducer = combineReducers({
    Counter,
    auth: authReducer
})