import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './assets/index.css';
import Router from './router/router'
import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux'
import {counter} from '../src/redux/index.redux'
import * as serviceWorker from './serviceWorker';

//
// const store = createStore(counter, compose(
//   applyMiddleware(thunk), window.devToolsExtension ? window.devToolsExtension() : f => f
// ));

// const store = createStore(counter);

ReactDOM.render(<Router/>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
