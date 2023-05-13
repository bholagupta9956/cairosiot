import React from "react";
import ReactDOM from "react-dom";
import { Provider } from 'react-redux'
import store from './store';
import Routes from './routes';
import './styles.css';
import "react-toastify/dist/ReactToastify.css";

const wrapper = document.getElementById("container");

if(wrapper) {
  ReactDOM.render(
  <Provider store={store}>
    <Routes />
  </Provider>, wrapper
  )
}