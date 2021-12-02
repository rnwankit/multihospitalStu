import { takeEvery, call, put } from "redux-saga/effects";
import * as ActionTypes from '../ActionTypes'
import { fetchAllDoctorsRequest } from "../../common/apis/doctors_api";
import { setDoctors } from "../actions/doctors.action";

function* fetchDoctors() {
  try {
    const doctors = yield call(fetchAllDoctorsRequest);

    yield put(setDoctors(doctors));
  } catch (e) {}
}

export function* waitForFetchDoctors() {
  yield takeEvery(ActionTypes.DOCTORS_FETCH, fetchDoctors);
}