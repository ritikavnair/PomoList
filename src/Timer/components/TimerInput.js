import React, { Component } from 'react';
import moment from 'moment';
class TimerInput extends Component {

    constructor(){
        super();
        this.updateInitialTime = this.updateInitialTime.bind(this);
    }

    updateInitialTime(){                
        const mins =  document.getElementById('minutes').value;
        if (mins){
            const newInitialTime =  moment.duration(parseInt(mins,10), 'minutes');
            this.props.setInitialTime(newInitialTime);
        }        
    }

    render() {
        return(
        <div>
            <div className="form-group">
                <label>Hours</label>
                <input id="hours" type="number" />
            </div>
            <div className="form-group">
                <label>Minutes</label>
                <input id="minutes" type="number" />
            </div>
            <div className="form-group">
                <label>Seconds</label>
                <input id="seconds" type="number" />
            </div>
            <button onClick={this.updateInitialTime}>Update</button>
        </div>);
    }

}
export default TimerInput;