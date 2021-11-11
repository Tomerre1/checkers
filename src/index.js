
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom'
import { RootCmp } from './root-cmp';
import './assets/styles/main.scss';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <RootCmp />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

