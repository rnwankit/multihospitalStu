import * as ActionTypes from '../ActionTypes'

const InitialState={
    isLoading: true,
    medicines: [],
    errMsg: null
}

export const Medicines = (state=InitialState, action) => {
    console.log(action.type, action.payload, state)
    switch (action.type) {
        case ActionTypes.MEDICINES_LOADING :
            return {
                ...state,
                medicines: [],
                isLoading: true,
                errMsg: null
            }
        case ActionTypes.MEDICINES_RETRIEVED :
                return {
                    ...state,
                    medicines: action.payload,
                    isLoading: false,
                    errMsg: null
                }
        case ActionTypes.MEDICINES_ADD:
            return {
                ...state,
                medicines: state.medicines.concat(action.payload),
                isLoading: false,
                errMsg: null
            }
        case ActionTypes.MEDICINES_UPDATE:
            return {
                ...state,
                medicines: state.medicines.map((v) => {
                    if (v.id === action.payload.id) {
                        return action.payload
                    } else {
                        return v
                    }
                }),
                isLoading: false,
                errMsg: null
            }
        case ActionTypes.MEDICINES_DELETE:
            return {
                ...state,
                medicines: state.medicines.filter((m) => m.id !== action.payload),
                isLoading: false,
                errMsg: null
            }
        case ActionTypes.MEDICINES_FAILED :
            return {
                ...state,
                medicines: [],
                isLoading: false,
                errMsg: action.payload
            }    
        default:
            return state
    }
}