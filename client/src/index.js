import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Content from './Components/Content';

const rootPath = process.env.ROOT_PATH || "@home";

ReactDOM.render(
  <React.StrictMode>
    <Content path={rootPath} />
  </React.StrictMode>,
  document.getElementById('root')
);