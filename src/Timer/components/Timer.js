import React, { Component } from 'react';
import Countdown from './Countdown';
import TimerButtons from './TimerButtons';
import moment from 'moment';
import * as timerStates from '../timerStates';

class Timer extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            currentTime: moment.duration(0, 'minutes'),
            initialTime: moment.duration(props.initialTime, 'minutes'),
            runState: timerStates.NOT_SET,
            taskList: [],
            currentTask: {},
            pendingTasks : [],
            elapsedTasks :[],
            timer: null

        }
       
        this.startTimer = this.startTimer.bind(this);
        this.reduceTime = this.reduceTime.bind(this);
        this.stopTimer = this.stopTimer.bind(this);
        this.finishTimer = this.finishTimer.bind(this);
       
        this.startNextTaskTimer = this.startNextTaskTimer.bind(this);
        this.getTopPendingTask = this.getTopPendingTask.bind(this);
        this.clearAll = this.clearAll.bind(this);
        this.clearTimer = this.clearTimer.bind(this);
    }

    componentDidUpdate(prevProps) {
        
        
        const topPendingTask = this.getTopPendingTask(this.props.tasksList);
        if ((this.props.tasksList.length !== prevProps.tasksList.length) && topPendingTask && (this.state.runState === timerStates.NOT_SET)) {
  
            const newInitialTime = moment.duration(parseInt(topPendingTask.time, 10), 'minutes');

            this.setState(
                {
                    initialTime: newInitialTime,
                    currentTime: newInitialTime,
                    taskList: this.props.tasksList,
                    currentTask: topPendingTask,
                    pendingTasks: this.props.tasksList
                }
            );
        }

      
    }

  
    getTopPendingTask(currentTaskList){
        if(currentTaskList.length > 0){
            const firstTaskId = currentTaskList.reduce((min, o) => o.id < min ? o.id : min, currentTaskList[0].id);
            const currentTask = currentTaskList.find(x => x.id === firstTaskId);
            return currentTask;
        }
        
    }

    startTimer() {
                
        this.setState({
            runState: timerStates.RUNNING,
            timer: setInterval(this.reduceTime, 1000),
            
        });
        this.props.updateTimerState(timerStates.RUNNING);
    }

    stopTimer() {
        if (this.state.timer) {
            clearInterval(this.state.timer);
        }
        this.setState({
            runState: timerStates.PAUSED,
            timer: null,

        });
        this.props.updateTimerState(timerStates.PAUSED);
    }

    reduceTime() {
        
        if (this.state.currentTime.get('hours') === 0 && this.state.currentTime.get('minutes') === 0 && this.state.currentTime.get('seconds') === 0) {
            this.props.setTaskToCheck(this.state.currentTask);
            
            // remove current task from pending list.
            const remainingTasks = this.state.pendingTasks.filter(x=> x.id !== this.state.currentTask.id);
            
           
            if(remainingTasks.length ===0){
                this.finishTimer();
            }
            else{
                this.startNextTaskTimer(remainingTasks);
            }
            
            return;
        }

        const newTime = moment.duration(this.state.currentTime);
        newTime.subtract(1, 'second');

        this.setState({
            currentTime: newTime
        });

    }

    startNextTaskTimer(remainingTasks){

        alert("Time for task "+ this.state.currentTask.name + " is over!");
        const topPendingTask = this.getTopPendingTask(remainingTasks);
        
       
            this.setState({
                
                currentTask: topPendingTask,        
                pendingTasks: remainingTasks,
                currentTime: moment.duration(parseInt(topPendingTask.time, 10), 'minutes'),
            });
        
        
    }

    finishTimer() {
        if (this.state.timer) {
            clearInterval(this.state.timer);
        }
        this.setState({
            
            runState: timerStates.ALL_DONE,
            timer: null,
            pendingTasks: []

        });
        window.alert("Time up!")
        this.setState({
            runState: timerStates.NOT_SET
        });
        this.props.updateTimerState(timerStates.NOT_SET);


    }

    clearAll(){
        
        this.clearTimer();
        this.props.clearAllTasks();
    }
    clearTimer(){
        
        if (this.state.timer) {
            clearInterval(this.state.timer);
        }
        this.setState ({
            currentTime: moment.duration(0, 'minutes'),
            initialTime: moment.duration(this.props.initialTime, 'minutes'),
            runState: timerStates.NOT_SET,
            taskList: [],
            currentTask: {},
            pendingTasks : [],
            elapsedTasks :[],
            timer : null

        });
    }

    render() {
        
        return (
            <div >
                
                <Countdown currentTime={this.state.currentTime} />
                {
                    (Object.keys(this.state.currentTask).length !== 0) &&
                    (
                        <h3>{this.state.currentTask.name}</h3>
                    )
                }
                <TimerButtons
                    startTimer={this.startTimer}
                    runState={this.state.runState}
                    stopTimer={this.stopTimer}
                    clearAll = {this.clearAll}/>
                
                
            </div>);
    }
}

export default Timer;