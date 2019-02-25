import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Inputs from './Inputs';
import * as serviceWorker from './serviceWorker';
import Bar from './Appbar';

ReactDOM.render(<Bar />, document.getElementById('appbar'));
ReactDOM.render(<Inputs />, document.getElementById('input'));

serviceWorker.unregister();

