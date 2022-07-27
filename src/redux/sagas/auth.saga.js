import { all, call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import { signUpAPI } from '../../common/api/auth.api';
import { authFailed } from '../actions/auth.action';
import * as ActionType from '../ActionTypes'

function* signup(action) {
          try {
                    console.log("hiiiii");
                    const user = yield call(signUpAPI, action.payload);
                    yield put({ type: ActionType.EMAIL_VERIFICATION, user: user });
          } catch (e) {
                    console.log(e);
                    yield put(authFailed(e.payload));
          }
}

function* watchSignUpUser() {
          yield takeEvery(ActionType.SIGNUP_USER, signup);
}

export function* authSaga() {
          yield all([
                    watchSignUpUser()
          ])
}