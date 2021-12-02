import * as ActionTypes from '../ActionTypes'

export const fetchDoctors = () => {
    return { type: ActionTypes.DOCTORS_FETCH };
  };
  
  export const setDoctors = (doctors = null) => {
    if (doctors) {
      return {
        type: ActionTypes.DOCTORS_RETRIEVED,
        payload: doctors.data.data,
      };
    }
  };