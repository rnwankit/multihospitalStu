import { combineReducers } from "redux";
import { Counter } from '../reducers/counter.reducer'
import { Medicines } from "./medicines.reducer";
import { patientsReducer } from "./patients.reducer";

export const rootReducer = combineReducers({
    Counter,
    Medicines,
    patientsReducer
})