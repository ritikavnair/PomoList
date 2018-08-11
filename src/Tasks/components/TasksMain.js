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
        const newTaskList = [...this.state.taskList,newTask]
        this.setState({
            taskList : newTaskList
        });
        // if(newTaskId===1){
        //     this.props.updateTimer(newTask.time);
        // }
        this.props.updateTimer(newTaskList);
        
    }

    render() {
        
        return (
            
            <div>
                 <table>
                     <thead>
                <TaskInput addNewTask={this.addNewTask}/>
                </thead>
                <TaskList taskList = {this.state.taskList}/>
                </table>
            </div>
        );
    }

}

export default TasksMain;
