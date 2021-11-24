import * as ActionTypes from '../ActionTypes'

const InitialState={
    isLoading: true,
    patients: [],
    errMsg: null
}

export const patientsReducer = (state=InitialState, action) => {
    console.log(action.type, action.payload, state)
    switch (action.type) {
        case ActionTypes.PATIENTS_LOADING :
            return {
                ...state,
                patients: [],
                isLoading: true,
                errMsg: null
            }
        case ActionTypes.PATIENTS_RETRIEVED :
                return {
                    ...state,
                    patients: action.payload,
                    isLoading: false,
                    errMsg: null
                }
        case ActionTypes.PATIENTS_DELETE:
            return {
                ...state,
                patients: state.patients.filter((m) => m.id !== action.payload),
                isLoading: false,
                errMsg: null
            }
        case ActionTypes.PATIENTS_FAILED :
            return {
                ...state,
                patients: [],
                isLoading: false,
                errMsg: action.payload
            }    
        default:
            return state
    }
}