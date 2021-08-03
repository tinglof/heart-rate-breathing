import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import styles from './seconds-timer.module.scss';

const SecondsTimer = ({intialTimeInSeconds, onCountDownEnd}) => {

    const [seconds, setSeconds] = useState(intialTimeInSeconds);

    const currentInstance =  useRef();

    currentInstance.current = seconds;

    let interval = null;

    useEffect(() => {
        // Update the document title using the browser API
        interval = setInterval(updateSeconds, 1000);
        
        return () => {
            if(interval) {
                clearInterval(interval);
            }
        }
    }, []);
    
    const updateSeconds = () => {
        if(currentInstance.current <= 1) {
            setSeconds(seconds => seconds - 1);
            onCountDownEnd();
            if(interval) {
                clearInterval(interval);
            }
        } else {
            setSeconds(seconds => seconds - 1);
        }
    }

    return (
        <div className={styles.timer}>
            { seconds > 0 ? seconds : null }
        </div>
    );
};
SecondsTimer.propTypes = {
    onCountDownEnd: PropTypes.func,
    intialTimeInSeconds: PropTypes.number
};
SecondsTimer.defaultProps = {
    onCountDownEnd: () => {},
    intialTimeInSeconds: 10
};

export default SecondsTimer;
