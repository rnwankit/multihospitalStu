import * as ActionTypes from '../ActionTypes'

const InitialState={
    isLoading: true,
    doctors: [],
    errMsg: null
}

export const doctorsReducer = (state=InitialState, action) => {
    console.log(action.type, action.payload, state)
    switch (action.type) {
        case ActionTypes.DOCTORS_LOADING :
            return {
                ...state,
                doctors: [],
                isLoading: true,
                errMsg: null
            }
        case ActionTypes.DOCTORS_RETRIEVED :
                return {
                    ...state,
                    doctors: action.payload,
                    isLoading: false,
                    errMsg: null
                }
        case ActionTypes.DOCTORS_ADD:
            return {
                ...state,
                doctors: state.doctors.concat(action.payload),
                isLoading: false,
                errMsg: null
            }
        case ActionTypes.DOCTORS_UPDATE:
            return {
                ...state,
                doctors: state.doctors.map((v) => {
                    if (v.id === action.payload.id) {
                        return action.payload
                    } else {
                        return v
                    }
                }),
                isLoading: false,
                errMsg: null
            }
        case ActionTypes.DOCTORS_DELETE:
            return {
                ...state,
                doctors: state.doctors.filter((m) => m.id !== action.payload),
                isLoading: false,
                errMsg: null
            }
        case ActionTypes.DOCTORS_FAILED :
            return {
                ...state,
                doctors: [],
                isLoading: false,
                errMsg: action.payload
            }    
        default:
            return state
    }
}