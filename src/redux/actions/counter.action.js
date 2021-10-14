import * as ActionTypes from '../ActionTypes'

export const increment = () => ({
    type: ActionTypes.INCREMENT_COUNTER,
    payload: 0
})

export const decrement = () => ({
    type: ActionTypes.DECREMENT_COUNTER,
    payload: 0
})