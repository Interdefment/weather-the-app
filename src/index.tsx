import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import utc from 'dayjs/plugin/utc';
import dayjs from 'dayjs';


dayjs.extend(utc);

// antd still uses findDOMNode
ReactDOM.render(
	// <React.StrictMode>
	<App />,
	// </React.StrictMode>,
	document.getElementById('root')
);
