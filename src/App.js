import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react';
import './App.css';
import Timer from './Timer/components/Timer';
import * as timerStates from './Timer/timerStates';
import TasksMain from './Tasks/components/TasksMain';
global.jQuery = require('jquery');
require('bootstrap');

class App extends Component {

  constructor(){
    super();
    this.state = {
      firstTaskTime : 0,
      tasksList : [],
      runState: timerStates.NOT_SET
    }

    this.updateTimer= this.updateTimer.bind(this);
    this.updateTimerState= this.updateTimerState.bind(this);
  }


  updateTimer(taskList){
    
    this.setState({
      tasksList : [...taskList]
    });
  }

  updateTimerState(currentState){
    this.setState({
      runState: currentState
    });
  }

  render() {
    
    return (
      <div>
        <div className="split left" id="left-panel">
          <div className="centered">
            <h2>Tasks</h2>
            
              <TasksMain updateTimer={this.updateTimer} timerRunState = {this.state.runState} />
            
          </div>
        </div>

        <div className="split right" id="right-panel">
          <div className="centered">
            
              <div className="container align-items-center">
                <div className="text-center timer mx-auto">
                  <Timer tasksList = {this.state.tasksList}  updateTimerState={ this.updateTimerState}/>
                </div>
              
            </div>
          </div>
        </div>

      </div>


    );
  }
}

export default App;
