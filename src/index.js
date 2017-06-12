import React from 'react';
import ReactDOM from 'react-dom';

import './style.css';
import App from './components/App';

import qb from '../ffdata/huddle2016qb.json';

console.log('import - ', qb);


ReactDOM.render(<App/>, document.getElementById('root'));