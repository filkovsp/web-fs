import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Content from './Component/Content';
import LocationContext from './Context/LocationContext';

const self = {
  hostname: window.location.hostname,
  clientPosrt: 3000,
  serverPort: 3010
}

ReactDOM.render(
  <React.StrictMode>
    <LocationContext.Provider value={self}>
      <Content path={"home"}/>
    </LocationContext.Provider>
  </React.StrictMode>,
  document.getElementById('root')
);