import React from 'react';
import {isMobile} from 'react-device-detect';
import './App.css';

const App = () => isMobile 
  ?<div className="Mobile"> mobile</div>
  :<div className="Browser">
    
  </div>

export default App;
