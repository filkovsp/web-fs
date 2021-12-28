import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Content from './Component/Content';
import LocationContext from './Context/LocationContext';

const self = {
  protocol: window.location.protocol,
  hostname: window.location.hostname,

  // todo: this should come from .env file, that must be done with webpack
  serverPort: 5000
}

ReactDOM.render(
  <React.StrictMode>
    <LocationContext.Provider value={self}>
      <Content path={"home"}/>
    </LocationContext.Provider>
  </React.StrictMode>,
  document.getElementById('root')
);