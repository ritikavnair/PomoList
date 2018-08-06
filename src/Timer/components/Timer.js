import React, { Component } from 'react';
import Countdown from './Countdown';
import TimerInput from './TimerInput';
import TimerButtons from './TimerButtons';
import moment from 'moment';
import * as timerStates from '../timerStates';

class Timer extends Component {

    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
            currentTime: moment.duration(25, 'minutes'),
            initialTime: moment.duration(props.initialTime, 'minutes'),
            runState: timerStates.NOT_SET,
            taskList : [],
            currentTask: {}

        }
        this.setInitialTime = this.setInitialTime.bind(this);
        this.startTimer = this.startTimer.bind(this);
        this.reduceTime = this.reduceTime.bind(this);
        this.stopTimer = this.stopTimer.bind(this);
        this.finishTimer = this.finishTimer.bind(this);
        this.updateInitialTime = this.updateInitialTime.bind(this);
    }

    componentDidUpdate(prevProps) {
        console.log("Inside compdidUpdate");
        // Typical usage (don't forget to compare props):
        if (this.props.initialTime !== prevProps.initialTime) {
            const newInitialTime =  moment.duration(parseInt(this.props.initialTime,10), 'minutes');
            this.setState(
                {
                    initialTime: newInitialTime,
                    currentTime: newInitialTime
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


    updateInitialTime(){                
        //const mins =  document.getElementById('minutes').value;
        if (this.props.initialTime >=0){
            const newInitialTime =  moment.duration(parseInt(this.props.firstTaskTime,10), 'minutes');
            this.setInitialTime(newInitialTime);
        }        
    }


    startTimer() {
        this.setState({
            runState: timerStates.RUNNING,
            timer: setInterval(this.reduceTime,1000)
        });
    }

    stopTimer() {
        if(this.state.timer){
            clearInterval(this.state.timer);
        }
        this.setState({
            runState: timerStates.NOT_SET,
            timer: null,
            
        });
    }

    reduceTime(){
        if(this.state.currentTime.get('hours')===0 && this.state.currentTime.get('minutes')===0 && this.state.currentTime.get('seconds')===0){
            this.finishTimer();
            return;
        }

        const newTime = moment.duration(this.state.currentTime);        
        newTime.subtract(1,'second');
        
        this.setState({
            currentTime:newTime
        });

    }

    finishTimer(){
        if(this.state.timer){
            clearInterval(this.state.timer);
        }
        this.setState({
            runState: timerStates.ALL_DONE,
            timer: null,
            
        });
        window.alert("Your time is over")        
        this.setState({
                runState: timerStates.NOT_SET                
        });    


    }
    render() {
        console.log("Inside timer js render");
       
        return (
            <div >
                <TimerButtons 
                startTimer = {this.startTimer}
                runState = {this.state.runState}
                stopTimer = {this.stopTimer}/>
                <Countdown currentTime={this.state.currentTime} />
               
            </div>);
    }
}

export default Timer;