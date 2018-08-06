import React, { Component } from 'react';
import TaskInput from './TaskInput';
import TaskList from './TaskList';


class TasksMain extends Component {

    constructor() {
        super();
        this.state = {
            taskList : []
        }

        this.addNewTask = this.addNewTask.bind(this);
    }

    addNewTask(taskName, timeRequired){
        const newTaskId = this.state.taskList.length + 1;
        const newTask = {id:newTaskId, name: taskName, time:timeRequired }
        
        this.setState({
            taskList : [...this.state.taskList,newTask]
        });
        if(newTaskId===1){
            this.props.updateTimer(newTask.time);
        }
        
    }

    render() {
        
        return (
            
            <div>
                <TaskInput addNewTask={this.addNewTask}/>
                <TaskList taskList = {this.state.taskList}/>
            </div>
        );
    }

}

export default TasksMain;