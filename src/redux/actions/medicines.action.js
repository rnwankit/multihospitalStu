import * as ActionTypes from '../ActionTypes'
import { baseUrl } from '../../shared/baseUrl';
import { configureStore } from '../store';

const store = configureStore()

export const fetchMedicines = () => (dispatch) => {
  dispatch(medicinesLoading(true));

  setTimeout(function () {
    return fetch(baseUrl + 'medicines')
      .then(response => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error('Error ' + response.status + ': ' + response.statusText);
          error.response = response;
          throw error;
        }
      },
        error => {
          var errmess = new Error(error.message);
          throw errmess;
        })
      .then(response => response.json())
      .then(medicines => dispatch(({ type: ActionTypes.MEDICINES_RETRIEVED, payload: medicines })))
      .catch(error => dispatch(medicinesFailed(error.message)));
  }, 1000)
}

export const medicinesLoading = () => ({
  type: ActionTypes.MEDICINES_LOADING
});

export const medicinesFailed = (errmess) => ({
  type: ActionTypes.MEDICINES_FAILED,
  payload: errmess
});

export const deleteMedicine = (id) => (dispatch) => {
  return fetch(baseUrl + "medicines/" + id, {
    method: 'delete'
  })
    .then(response => {
      if (response.ok) {

        return response;
      } else {
        var error = new Error('Error ' + response.status + ': ' + response.statusText);
        error.response = response;
        throw error;
      }
    },
      error => {
        var errmess = new Error(error.message);
        throw errmess;
      })
    .then(alert("Medicine deleted successfully."))
    .then(dispatch(({ type: ActionTypes.MEDICINES_DELETE, payload: id })))
    .catch(error => dispatch(medicinesFailed(error.message)));
}

export const updateMedicine = (updateData) => (dispatch) => {
  return fetch(baseUrl + "medicines/" + updateData.id, {
    method: 'PUT',
    body: JSON.stringify(updateData),
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(response => {
      if (response.ok) {

        return response;
      } else {
        var error = new Error('Error ' + response.status + ': ' + response.statusText);
        error.response = response;
        throw error;
      }
    },
      error => {
        var errmess = new Error(error.message);
        throw errmess;
      })
    .then(response => response.json())
    .then(() => dispatch(({ type: ActionTypes.MEDICINES_UPDATE, payload: updateData })))
    .catch(error => dispatch(medicinesFailed(error.message)));
}

export const addMedicine = (newData) => (dispatch, getState) => {
  try {
    let id = newData.length
    let medicines = getState().Medicines
    let lastId = medicines.medicines[medicines.medicines.length - 1].id

    newData.map((n) => {
      let newId = lastId + id;
      let data = { ...n, "id": newId }

      id--;

      return fetch(baseUrl + "medicines", {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: "same-origin"
      })
        .then(response => {
          if (response.ok) {
            return response;
          } else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
          }
        },
          error => {
            var errmess = new Error(error.message);
            throw errmess;
          })
        .then(response => response.json())
        .then(() => dispatch(({ type: ActionTypes.MEDICINES_ADD, payload: data })))
        .catch(error => dispatch(medicinesFailed(error.message)));
    })
  } catch (error) {
    dispatch(medicinesFailed(error.message))
  }
}