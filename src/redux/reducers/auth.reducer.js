import * as ActionTypes from "../ActionTypes"

const InitialState = {
          isLoading: false,
          user: null,
          error: ''
}

export const authReducer = (state = InitialState, action) => {
          console.log(action.type, action.payload);
          switch (action.type) {
                    case ActionTypes.SIGNUP_USER:
                              return {
                                        ...state,
                                        isLoading: true,
                                        user: null,
                                        error: ''
                              }
                    case ActionTypes.EMAIL_VERIFICATION:
                              return {
                                        ...state,
                                        isLoading: false,
                                        user: null,
                                        error: ''
                              }
                    case ActionTypes.AUTH_ERRROR:
                              return {
                                        ...state,
                                        isLoading: false,
                                        user: null,
                                        error: action.payload  
                              }
                    default:
                              return state
          }
}