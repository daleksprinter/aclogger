import React from 'react';
import ReactDOM from 'react-dom';

import Inputs from './components/inputs/Inputs';
import Bar from './components/appbar/Appbar';

import './index.css';

import * as serviceWorker from './serviceWorker';

ReactDOM.render(<Bar />, document.getElementById('appbar'));
ReactDOM.render(<Inputs />, document.getElementById('input'));

serviceWorker.unregister();

