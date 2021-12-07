import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Content from './Components/Content';

ReactDOM.render(
  <React.StrictMode>
    <Content path={"home"}/>
  </React.StrictMode>,
  document.getElementById('root')
);