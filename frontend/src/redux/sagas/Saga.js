import { put, takeLatest, call } from "redux-saga/effects";
import axios from "axios";

import Url from "../../util/Config";

function getUserData(action) {
  return axios.post(`${Url.baseurl}/auth/`, action.payload);
}

export function* getDataAsync(action) {
  try {
    const userData = yield call(getUserData, action);
    if (!userData) {
      console.log("in saga", userData);
    }
    yield put({ type: "SET_LOGED_IN_USER_DATA", userData });
  } catch (error) {
    yield put({ type: "HANDLEERROR", error });
  }
}

export function* watchLoggedInUser(action) {
  yield takeLatest("REQUEST_LOGIN", getDataAsync);
}
