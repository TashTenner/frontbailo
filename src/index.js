import React from "react";
import ReactDOM from "react-dom";

import 'reset-css';
import 'normalize.css';

import "./index.css";
import "./fonts/Arciform.otf";

import AuthProvider from './Context/AuthContext';

import App from "./App";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(<AuthProvider>
  <App />
</AuthProvider>, document.getElementById('root'));

serviceWorker.unregister();
