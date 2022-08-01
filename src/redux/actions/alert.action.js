import * as ActionType from '../ActionTypes'

export const setAlert = (data) => (dispatch) => {
          dispatch({type: ActionType.SET_ALERT, payload: data})
}

export const resetAlert = () => (dispatch) => {
          dispatch({type: ActionType.RESET_ALERT})
}