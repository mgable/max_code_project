import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas';
import reducers from './reducers';
import 'bootstrap/dist/css/bootstrap.css';
import App from './App';
import { composeWithDevTools } from 'redux-devtools-extension';
import './index.css';

// saga boilerplate
const sagaMiddleware = createSagaMiddleware();
let store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(sagaMiddleware))
);
sagaMiddleware.run(rootSaga);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
