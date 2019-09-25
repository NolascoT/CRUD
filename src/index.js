import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'

import './index.css';
import App from './app';
import * as serviceWorker from './serviceWorker';

import { createStore } from './store'
import Backendless from 'backendless'

Backendless.initApp('E48BD4FB-4917-D177-FFFE-4C669C916F00', '37AAD83C-D972-7A54-FF5E-6624FC967300');

const rootElement = document.getElementById('root');
ReactDOM.render(
  <Provider store={createStore()}>
    <App/>
  </Provider>,
  rootElement
);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();