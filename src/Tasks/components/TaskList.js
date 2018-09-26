import React, { Component } from 'react';

class TaskList extends Component {

    constructor() {
        super();
        this.renderTask = this.renderTask.bind(this);
        this.checkMarkTask = this.checkMarkTask.bind(this);
    }

    checkMarkTask(task){
        if(task==null) return;
        const taskId = task.id;
        const taskRow = document.getElementById(taskId);
        if(taskRow){
            const taskRowIconCol = taskRow.getElementsByClassName("taskStatusIcon");
            if(taskRowIconCol){
                taskRowIconCol[0].innerHTML = "<i class='material-icons md-18' >check_circle</i>";
            }
        }
    }
    renderTask(task) {
    console.log(task.id);
        return (
            <tr key={task.id} id={task.id}>
                <td className="taskStatusIcon"> </td>
                <td className="taskInput"><input value={task.name} readOnly /></td>
                <td className="timeInput"><input value={task.time} readOnly /></td>

                <td><button className="btn btn-default deleteButton" disabled={this.props.disabled}><i className="material-icons md-18" >delete</i></button></td>
            </tr>
        );
    }


    render() {
        console.log("inside tasklist render");
        console.log(this.props.taskToCheck);
        console.log(this.props.taskList);
        return (

            <tbody>
                <tr style={{ height: '20px' }}><td></td></tr>
                {this.props.taskList.map(this.renderTask)}
                {this.checkMarkTask(this.props.taskToCheck)}
            </tbody>

        );
    }
}
export default TaskList;