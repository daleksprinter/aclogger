import React from 'react';
import ReactDOM from 'react-dom';

import Bar from './components/NavBar/NavBar';
import App from './components/App/App';

import './index.css';

import * as serviceWorker from './serviceWorker';

ReactDOM.render(<Bar />, document.getElementById('appbar'));
ReactDOM.render(<App />, document.getElementById('input'));

serviceWorker.register();

