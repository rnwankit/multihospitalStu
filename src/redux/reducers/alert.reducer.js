import * as ActionTypes from "../ActionTypes"

const InitialState = {
          text: '',
          color: ''
}

export const alertReducer = (state = InitialState, action) => {
          console.log(action.type, action.payload);
          switch (action.type) {
                    case ActionTypes.SET_ALERT:
                              return {
                                        ...state,
                                        text: action.payload.text,
                                        color: action.payload.color,
                              }
                    case ActionTypes.RESET_ALERT:
                              return InitialState
                    
                    default:
                              return state
          }
}