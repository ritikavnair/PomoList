import React, { Component } from 'react';
import TaskInput from './TaskInput';
import TaskList from './TaskList';
import * as timerStates from '../../Timer/timerStates';


class TasksMain extends Component {

    constructor() {
        super();
        this.state = {
            taskList : [],
            maxTaskId : 0
        }

        this.addNewTask = this.addNewTask.bind(this);
    }

    addNewTask(taskName, timeRequired){
        const newTaskId = this.state.maxTaskId + 1;
        const newTask = {id:newTaskId, name: taskName, time:timeRequired }
        const newTaskList = [...this.state.taskList,newTask]
        this.setState({
            taskList : newTaskList,
            maxTaskId : newTaskId
        });
        // if(newTaskId===1){
        //     this.props.updateTimer(newTask.time);
        // }
        this.props.updateTimer(newTaskList);
        
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
                <TaskInput addNewTask={this.addNewTask} disabled= {disabled}/>
                </thead>
                <TaskList taskList = {this.state.taskList} disabled= {disabled} taskToCheck={this.props.taskToCheck}/>
                </table>
            </div>
        );
    }

}

export default TasksMain;
