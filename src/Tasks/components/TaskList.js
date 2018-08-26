import React, { Component } from 'react';

class TaskList extends Component {

    constructor() {
        super();
        this.renderTask = this.renderTask.bind(this);
    }

    renderTask(task) {
        
        return (
            <tr key = {task.id}>
             <td className="taskInput"><input value={task.name} readOnly/></td>
                <td className="timeInput"><input type="number" min="1" max="60" value ={task.time}  readOnly /></td>
               
                <td><button disabled={this.props.disabled}><i className="material-icons" >delete</i></button></td>
            </tr>
            );
    }


    render() {
        return (
           
                <tbody>
                    <tr style={{height: '20px'}}><td></td></tr>
                        {this.props.taskList.map(this.renderTask)}
                    
                </tbody>
            
        );
    }
}
export default TaskList;