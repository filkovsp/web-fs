import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Content from './Component/Content';
import LocationContext from './Context/LocationContext';

const self = {
  protocol: window.location.protocol,
  hostname: window.location.hostname,
  serverPort: process.env.BACKEND_PORT || 5000,
  rootPath: process.env.ROOT_PATH || "@home"
}

ReactDOM.render(
  <React.StrictMode>
    <LocationContext.Provider value={self}>
      <Content path={self.rootPath} />
    </LocationContext.Provider>
  </React.StrictMode>,
  document.getElementById('root')
);