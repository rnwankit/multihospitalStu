import { combineReducers } from "redux";
import { Counter } from '../reducers/counter.reducer'
import { alertReducer } from "./alert.reducer";
import { authReducer } from "./auth.reducer";

export const rootReducer = combineReducers({
    Counter,
    auth: authReducer,
    alert: alertReducer
})