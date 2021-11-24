import {sendGetJson, sendPostJson, sendPutJson, sendDeleteJson} from '../request'

export function  fetchAllPatientsRequest() {
    return sendGetJson(`/users`);
}

export function submitPatientRequest(data) {
    return sendPostJson(`/users`, data);
}

export function removePatientRequest(id) {
    return sendDeleteJson(`/users/${id}`);
}

export function updatePatientRequest(data) {
    return sendPutJson(`/users/${data.id}`, data);
} 
