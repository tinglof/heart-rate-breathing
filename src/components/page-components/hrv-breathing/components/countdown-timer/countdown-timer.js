import React from 'react';
import styles from './countdown-timer.module.scss';
import PropTypes from 'prop-types';
import Timer from 'react-compound-timer';


const CountdownTimer = ({intialTimeInMin, onCountDownEnd}) => {
    return (
        <Timer
            formatValue={(value) => `${(value < 10 ? `0${value}` : value)}`}
            initialTime={intialTimeInMin * 60 * 1000}
            direction="backward"
            checkpoints={[
                {
                    time: 0,
                    callback: onCountDownEnd,
                },
            ]}
        >
            <div className={styles.timer}>
                <Timer.Minutes /> <span className={styles.divider}> : </span> <Timer.Seconds /> 
            </div>
        </Timer>
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
