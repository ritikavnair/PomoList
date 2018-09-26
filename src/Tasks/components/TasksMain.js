import React, { Component } from 'react';
import TaskInput from './TaskInput';
import TaskList from './TaskList';
import * as timerStates from '../../Timer/timerStates';


class TasksMain extends Component {

    constructor() {
        super();
              
    }
   
    render() {
        var disabled = true;
        if(this.props.timerRunState===timerStates.NOT_SET){
            disabled = false;
        }
        console.log("Inside TasksMainrender");
        console.log(this.props.timerRunState);
        console.log(disabled);
        return (
            
            <div>
                 <table>
                     <thead>
                <TaskInput addNewTask={this.props.addNewTask} disabled= {disabled}/>
                </thead>
                <TaskList taskList = {this.props.taskList} disabled= {disabled} taskToCheck={this.props.taskToCheck}/>
                </table>
            </div>
        );
    }

}

export default TasksMain;
