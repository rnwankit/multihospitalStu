import { all } from "redux-saga/effects";
import {waitForFetchDoctors } from "./doctors.saga";

export default function* rootSaga() {
  yield all([waitForFetchDoctors()]);
}