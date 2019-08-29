/* imports */
import {
  all,
  takeEvery
} from 'redux-saga/effects';
import { watchAPI } from './Helpers/async';


// Saga generator functions

/** private function
 * @description  prints all actions to console.log
 */
function* watchAllActions() {
  if (sessionStorage && sessionStorage.reportEvents) {
    // eslint-disable-next-line require-yield
    yield takeEvery('*', function* logger(action) {
      console.log(action);
    });
  }
}


/** public function
 * @description  yield all saga generator functions
 */
export default function* rootSaga() {
  yield all([
    watchAllActions(),
    watchAPI(),
  ]);
}
