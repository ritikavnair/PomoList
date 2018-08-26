import React, { Component } from 'react';
import Countdown from './Countdown';
import TimerInput from './TimerInput';
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
            elapsedTasks :[]

        }
        this.setInitialTime = this.setInitialTime.bind(this);
        this.startTimer = this.startTimer.bind(this);
        this.reduceTime = this.reduceTime.bind(this);
        this.stopTimer = this.stopTimer.bind(this);
        this.finishTimer = this.finishTimer.bind(this);
        this.updateInitialTime = this.updateInitialTime.bind(this);
        this.startNextTaskTimer = this.startNextTaskTimer.bind(this);
        this.getTopPendingTask = this.getTopPendingTask.bind(this);
    }

    componentDidUpdate(prevProps) {
        console.log("Inside compdidUpdate");
        
        const topPendingTask = this.getTopPendingTask(this.props.tasksList);
        if ((this.props.tasksList.length !== prevProps.tasksList.length) && topPendingTask && (this.state.runState === timerStates.NOT_SET)) {
  
           // const remainingTasks = this.props.tasksList.filter(x=> x.id !== topPendingTask.id);
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

    setInitialTime(initTime) {
        this.setState(
            {
                initialTime: initTime,
                currentTime: initTime
            }
        );

    }


    updateInitialTime() {
        //const mins =  document.getElementById('minutes').value;
        if (this.props.initialTime >= 0) {
            const newInitialTime = moment.duration(parseInt(this.props.firstTaskTime, 10), 'minutes');
            this.setInitialTime(newInitialTime);
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

        window.alert("Time for task "+ this.state.currentTask.name + " is over!");
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
        window.alert("Your time is over")
        this.setState({
            runState: timerStates.NOT_SET
        });
        this.props.updateTimerState(timerStates.NOT_SET);


    }
    render() {
        console.log("Inside timer js render");

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
                    stopTimer={this.stopTimer} />
                
                
            </div>);
    }
}

export default Timer;