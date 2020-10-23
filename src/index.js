import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import UpcomingEvents from './pages/UpcomingEvents/UpcomingEvents';
import 'antd/dist/antd.css';

ReactDOM.render(
  <React.StrictMode>
    <UpcomingEvents />
  </React.StrictMode>,
  document.getElementById('root'),
);
