import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Content from './Components/Content';
import LocationContext from './Contexts/LocationContext';

const self = {
  hostname: window.location.hostname
}

ReactDOM.render(
  <React.StrictMode>
    <LocationContext.Provider value={self}>
      <Content path={"home"}/>
    </LocationContext.Provider>
  </React.StrictMode>,
  document.getElementById('root')
);