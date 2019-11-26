import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'

import './index.css';
import App from './app';
import * as serviceWorker from './serviceWorker';

import { createStore } from './store'
import Backendless from 'backendless'

Backendless.initApp('ED171BA2-F591-9078-FF03-CE354435AA00', '4A2521D2-B594-49FA-B812-2ED29A96BB8B');

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