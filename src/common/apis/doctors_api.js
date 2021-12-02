import {sendGetJson, sendPostJson, sendPutJson, sendDeleteJson} from '../request'

export function  fetchAllDoctorsRequest() {
    return sendGetJson(`/users`);
}

export function submitDoctorRequest(data) {
    return sendPostJson(`/users`, data);
}

export function removeDoctorRequest(id) {
    return sendDeleteJson(`/users/${id}`);
}

export function updateDoctorRequest(data) {
    return sendPutJson(`/users/${data.id}`, data);
} 
