import React,{Component} from 'react';

class TaskInput extends Component {
    
    constructor(){
        super();
        this.addTask = this.addTask.bind(this);
    }

    addTask(){

        const taskInput = document.getElementById("userTaskInput").value;
        const timeInput = parseInt( document.getElementById("userTimeInput").value);
      

        if(taskInput && timeInput){
            this.props.addNewTask(taskInput,timeInput);
        }  
        document.getElementById("userTaskInput").value = "";
        document.getElementById("userTimeInput").value = "";
        document.getElementById("userTaskInput").focus();
    }
    
    render(){
        //style={{display:'inline', float: 'left'}}
        console.log("Inside taskInput render");
        console.log(this.props.disabled);
    return (
        <tr>
            <td id="taskStatusIconCol" ></td>
            <td id="taskInputCol"><input type="text" id="userTaskInput" placeholder="eg: Respond to e-mails"  className="form-control" disabled={this.props.disabled}/></td>
            <td id="timeInputCol"><input type="number" id="userTimeInput" placeholder="25"  className="form-control" min="1" max="60" disabled={this.props.disabled}/></td>
            <td><button onClick={this.addTask} id="add" className="btn btn-default" disabled={this.props.disabled}> + </button></td>
        </tr>
    );
}
}

export default TaskInput;