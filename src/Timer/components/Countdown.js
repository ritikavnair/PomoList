import React from 'react';

const leftPad = (value) => {
    if(value < 10) 
        return `0${value}`;
    return `${value}`;
}
const Countdown = (props) =>{
    return (
        <div>
            <h2>
            {`${leftPad(props.currentTime.get('minutes'))}: ${leftPad(props.currentTime.get('seconds'))} `}
            </h2>
        </div>

    );
}

export default Countdown;