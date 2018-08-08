import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react';
import './App.css';
import Timer from './Timer/components/Timer';
import TasksMain from './Tasks/components/TasksMain';
global.jQuery = require('jquery');
require('bootstrap');

class App extends Component {

  constructor(){
    super();
    this.state = {
      firstTaskTime : 0,
      tasksList : []

    }

    this.updateTimer= this.updateTimer.bind(this);
  }


  updateTimer(taskList){
    console.log("Inside updateTImer of app js");
    console.log(taskList);
    this.setState({
      tasksList : [...taskList]
    });
  }

  render() {
    console.log("Inside App js render");
    return (
      <div>
        <div className="split left" id="left-panel">
          <div className="centered">
            <h2>Tasks</h2>
            
              <TasksMain updateTimer={this.updateTimer} />
            
          </div>
        </div>

        <div className="split right" id="right-panel">
          <div className="centered">
            
              <div className="container h-100 align-items-center">
                <div className="text-center timer mx-auto">
                  <Timer tasksList = {this.state.tasksList}/>
                </div>
              
            </div>
          </div>
        </div>

      </div>


    );
  }
}

export default App;
