import React,{Component} from 'react';
import * as timerStates from '../timerStates';

class TimerButtons extends Component {

    constructor(){
        super();
        this.getButton = this.getButton.bind(this);

    }

    getButton(){
        if(this.props.runState === timerStates.NOT_SET || this.props.runState === timerStates.PAUSED ){
            return (<button className="btn btn-primary" onClick={this.props.startTimer}>Start</button>);
        }
        else{
            return (<button className="btn btn-danger" onClick={this.props.stopTimer}>Pause</button>);
        }

    }
    render() {

        return (
            <div>                
               {this.getButton()}
               <button className="btn btn-dark clearButton" onClick={this.props.clearAll}>Clear All</button>
            </div>
        );
    }
};

export default TimerButtons;