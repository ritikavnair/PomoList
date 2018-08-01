import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react';
import './App.css';
import Timer from './Timer/components/Timer';
global.jQuery = require('jquery');
require('bootstrap');

class App extends Component {
  render() {
    return (
      <div className="container h-100 align-items-center">
        <div className="text-center timer mx-auto">          
          <Timer />
        </div>
      </div>
    );
  }
}

export default App;
