import React from "react";
import ReactDOM from "react-dom";

import 'reset-css';
import 'normalize.css';

import "./index.css";
import "./fonts/Arciform.otf";

import AuthProvider from './Context/AuthContext';

import App from "./App";
import * as serviceWorker from "./serviceWorker";

// import { BrowserRouter } from "react-router-dom";

ReactDOM.render(<AuthProvider>
  <App />
</AuthProvider>, document.getElementById('root'));

// ReactDOM.render(
//   <BrowserRouter>
//     <App />
//   </BrowserRouter>,
//   document.getElementById("root")
// );

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
