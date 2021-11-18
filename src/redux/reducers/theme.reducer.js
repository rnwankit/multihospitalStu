import * as ActionTypes from "../ActionTypes"

export const ThemeReducer = (state, action) => {
    console.log(state, action)
    switch (action.type) {
        case ActionTypes.TOGGLE_THEME:
            return { ...state, theme: action.payload }

        default:
            return state
    }
}