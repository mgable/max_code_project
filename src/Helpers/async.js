/*global process */ 

import $ from 'jquery';
import { UNSPECIFIED_ERROR,  GET_API, setProcessing, API_KEY } from './types';
import { omit } from './index';
import { call, put, takeEvery } from 'redux-saga/effects';

const $http = $.ajax;
const domain = (process.env.REACT_APP_API_URL || '');

const fetchData = action => {
  return new Promise((resolve, reject) => {
    let params = Object.assign({}, action.params, {headers: {Authorization: API_KEY}})
    _http(action.ep, params).then(
      response => {
        resolve(response);
      },
      error => {
        reject(error);
        throw new Error(error);
      }
    );
  });
};

function _http(endpoint, params) {
  return $http(domain + endpoint, params, response => {
    return response;
  });
}

export const fetch = function* fetch(payload, type=call,) {
  yield put(setProcessing(true));

  var response,
    errorType,
    container = payload.action.container || 'response',
    baggage = omit(payload.action, ['type', 'ep', 'params']);

  try {
    response = yield type(fetchData, payload.action);
    if (payload.action.errorCondition && typeof payload.action.errorCondition === "function"  && payload.action.errorCondition(response)){
      errorType = payload.action.errorType || UNSPECIFIED_ERROR;
    }
  } catch (e) {
    response = e.responseJSON
    errorType = payload.action.errorType || UNSPECIFIED_ERROR;
    console.error('There was an error fetching: ', response); // cant throw here because fetch must always succeed.
  }

  yield put({
    type: errorType || payload.action.type,
    errorFor: payload.action.errorFor || null,
    [container]: response,
    ...baggage
  });

  yield put(setProcessing(false));
}

// grab all API calls and route them to http agent (e.g. the above fetch method)
export const watchAPI = function* watchAPI() {
  try {
    yield takeEvery(GET_API, fetch);
  } catch (e) {
    throw new Error('There was an error: ', e);
  }
}