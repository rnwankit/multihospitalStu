import * as ActionTypes from '../ActionTypes'
import { fetchAllPatientsRequest, removePatientRequest } from '../../common/apis/patients_api';

export const patientsLoading = () => ({
    type: ActionTypes.PATIENTS_LOADING
});

export const patientsFailed = (errmess) => ({
    type: ActionTypes.PATIENTS_FAILED,
    payload: errmess
});

export const fetchPatients = () => (dispatch) => {
    dispatch(patientsLoading(true));

    return fetchAllPatientsRequest()
        .then(response => dispatch({ type: ActionTypes.PATIENTS_RETRIEVED, payload: response.data }))
        .catch(response => dispatch(patientsFailed(response.message)))
}

export const deletePatient = (id) => (dispatch) => {
    return removePatientRequest(id)
        .then(dispatch({ type: ActionTypes.PATIENTS_DELETE, payload: id }))
        .catch(response => dispatch(patientsFailed(response.message)))
}

// export const updateMedicine = (updateData) => (dispatch) => {
//     return fetch(baseUrl + "medicines/" + updateData.id, {
//         method: 'PUT',
//         body: JSON.stringify(updateData),
//         headers: {
//             'Content-Type': 'application/json'
//         }
//     })
//         .then(response => {
//             if (response.ok) {

//                 return response;
//             } else {
//                 var error = new Error('Error ' + response.status + ': ' + response.statusText);
//                 error.response = response;
//                 throw error;
//             }
//         },
//             error => {
//                 var errmess = new Error(error.message);
//                 throw errmess;
//             })
//         .then(response => response.json())
//         .then(() => dispatch(({ type: ActionTypes.MEDICINES_UPDATE, payload: updateData })))
//         .catch(error => dispatch(medicinesFailed(error.message)));
// }

// export const addMedicine = (newData) => (dispatch, getState) => {
//     try {
//         let id = newData.length
//         let medicines = getState().Medicines
//         let lastId = medicines.medicines[medicines.medicines.length - 1].id

//         newData.map((n) => {
//             let newId = lastId + id;
//             let data = { ...n, "id": newId }

//             id--;

//             return fetch(baseUrl + "medicines", {
//                 method: 'POST',
//                 body: JSON.stringify(data),
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 credentials: "same-origin"
//             })
//                 .then(response => {
//                     if (response.ok) {
//                         return response;
//                     } else {
//                         var error = new Error('Error ' + response.status + ': ' + response.statusText);
//                         error.response = response;
//                         throw error;
//                     }
//                 },
//                     error => {
//                         var errmess = new Error(error.message);
//                         throw errmess;
//                     })
//                 .then(response => response.json())
//                 .then(() => dispatch(({ type: ActionTypes.MEDICINES_ADD, payload: data })))
//                 .catch(error => dispatch(medicinesFailed(error.message)));
//         })
//     } catch (error) {
//         dispatch(medicinesFailed(error.message))
//     }
// }