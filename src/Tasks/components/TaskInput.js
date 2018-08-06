import React,{Component} from 'react';

class TaskInput extends Component {
    
    constructor(){
        super();
        this.addTask = this.addTask.bind(this);
    }

    addTask(){

        const taskInput = document.getElementById("userInput");
        if(taskInput){
            this.props.addNewTask(taskInput.value,1);
        }  
        document.getElementById("userInput").value = "";
        
    }
    
    render(){
    return (
        <div>
            <input type="text" id="userInput" placeholder="eg: Respond to e-mails" />
            <button onClick={this.addTask} id="add"> + </button>
        </div>
    );
}
}

export default TaskInput;