import { put, takeLatest, all } from "redux-saga/effects";
import * as type from "actions/type/list";

function* fetchNews() {
  const json = yield fetch(
    "https://newsapi.org/v1/articles?source=cnn&apiKey=c39a26d9c12f48dba2a5c00e35684ecc"
  ).then(response => response.json());
  yield put({ type: type.REQUEST_API_SUCCESS, json: json.articles });
}

function* actionWatcher() {
  yield takeLatest(type.REQUEST_API, fetchNews);
}

export default function* rootSaga() {
  yield all([actionWatcher()]);
}
