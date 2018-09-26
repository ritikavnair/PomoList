import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react';
import './App.css';
import Timer from './Timer/components/Timer';
import * as timerStates from './Timer/timerStates';
import TasksMain from './Tasks/components/TasksMain';
global.jQuery = require('jquery');
require('bootstrap');

class App extends Component {

  constructor() {
    super();
    this.state = {
      firstTaskTime: 0,
      taskList: [],
      maxTaskId: 0,
      runState: timerStates.NOT_SET,
      taskToCheck: null      
    }

    this.updateTimerState = this.updateTimerState.bind(this);
    this.setTaskToCheck = this.setTaskToCheck.bind(this);
    this.clearAllTasks = this.clearAllTasks.bind(this);
    this.addNewTask = this.addNewTask.bind(this);
  }

  addNewTask(taskName, timeRequired) {
    const newTaskId = this.state.maxTaskId + 1;
    const newTask = { id: newTaskId, name: taskName, time: timeRequired }
    const newTaskList = [...this.state.taskList, newTask]
    this.setState({
      taskList: newTaskList,
      maxTaskId: newTaskId
    });

  }


  updateTimerState(currentState) {
    this.setState({
      runState: currentState
    });
  }

  setTaskToCheck(task) {
    this.setState({
      taskToCheck: task
    });
  }

  clearAllTasks() {
   
    this.setState({
      firstTaskTime: 0,
      taskList: [],
      maxTaskId: 0,
      runState: timerStates.NOT_SET,
      taskToCheck: null
    });
  }

  render() {

    return (
      <div>
        <div className="split left" id="left-panel">
          <div className="centered">
            <h2>Tasks</h2>

            <TasksMain timerRunState={this.state.runState}
              taskToCheck={this.state.taskToCheck}
              addNewTask={this.addNewTask}
              taskList={this.state.taskList} />

          </div>
        </div>

        <div className="split right" id="right-panel">
          <div className="centered">

            <div className="container align-items-center">
              <div className="text-center timer mx-auto">
                <Timer tasksList={this.state.taskList}
                  updateTimerState={this.updateTimerState}
                  setTaskToCheck={this.setTaskToCheck}
                  clearAllTasks={this.clearAllTasks} />
              </div>

            </div>
          </div>
        </div>
      </div>

    );
  }
}

export default App;
