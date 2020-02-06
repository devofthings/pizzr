/* eslint-disable jsx-a11y/accessible-emoji */
// SYSTEM 
import React from 'react';
import {isMobile} from 'react-device-detect';

// CUSTOM COMPONENTS
import CardContainer from './components/CardContainer/CardContainer';
import Configurator from './components/Configurator/Configurator';

// STYLE
import './App.css';

const App = () => isMobile 
  ?<div className="Mobile">
    <h1>🍕PIZZR</h1>
    <CardContainer />
    <Configurator />
    <p>made with 🍕 & 🍺</p>
  </div>
  :<div className="Browser"></div>

export default App;
