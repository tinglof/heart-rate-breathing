import React from 'react';
import styles from './countdown-timer.module.scss';
import PropTypes from 'prop-types';
import CountdownTimerSakit from '@sakit-sa/countdown-timer';


const CountdownTimer = ({intialTimeInSeconds, onCountDownEnd, format}) => {
    return (
        <div className={styles.timer}>
            <CountdownTimerSakit 
                time={intialTimeInSeconds}
                format={format ? format : "MM:SS"}
                onComplete={() => onCountDownEnd()} 
            />
        </div>
    );
};
CountdownTimer.propTypes = {
    onCountDownEnd: PropTypes.func,
    intialTimeInMin: PropTypes.number
};
CountdownTimer.defaultProps = {
    onCountDownEnd: () => {},
    intialTimeInMin: 10
};

export default CountdownTimer;
