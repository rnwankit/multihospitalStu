import * as ActionType from '../ActionTypes'


export const signupUserAction = (creds) => (dispatch) => {
          dispatch({type: ActionType.SIGNUP_USER, payload: creds})
}

export const signupMailVerification = () => (dispatch) => {
          dispatch({type: ActionType.EMAIL_VERIFICATION})
}

export const authFailed = (error) => (dispatch) => {
          dispatch({type: ActionType.AUTH_ERRROR, payload: error})
}