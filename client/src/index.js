import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Content from './Component/Content';
import LocationContext from './Context/LocationContext';

const self = {
  protocol: "http",
  hostname: window.location.hostname,
  clientPort: 3000,
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