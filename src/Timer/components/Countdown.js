import React from 'react';

const Countdown = (props) =>{
    return (
        <div>
            <h2>
            {`${props.currentTime.get('hours')} : ${props.currentTime.get('minutes')}: ${props.currentTime.get('seconds')} `}
            </h2>
        </div>

    );
}

export default Countdown;