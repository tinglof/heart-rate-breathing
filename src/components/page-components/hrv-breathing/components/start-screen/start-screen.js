import React from 'react';
import styles from './start-screen.module.scss';
//import PropTypes from 'prop-types'
//import UseAnimations from 'react-useanimations';
//import activity from 'react-useanimations/lib/activity';
import SwipeInput from '../swipe-input/swipe-input';
import Button from '../button/button';


const StartScreen = ({onChangeInBreath, onChangeOutBreath, onChangeSessionLength, onStart, 
                        inBreathValues, outBreathValues, sessionLengthValues }) => {
    return (
        <div className={styles.wrapper}>
                {/* <div className={styles.icon}>
                    <UseAnimations size={80} strokeColor={'#1F2128'} animation={activity} />
                </div> */}
                <h1 className={[styles.headline, 'hero-heading'].join(" ")}>Heart Rate Variability</h1>
            <SwipeInput 
                title={'seconds'}
                headline={'breath in'} 
                onChangeValue={onChangeInBreath}
                inputValues={inBreathValues}/>
            <SwipeInput 
                title={'seconds'} 
                headline={'breath out'}
                onChangeValue={onChangeOutBreath}
                inputValues={outBreathValues}/>
            <SwipeInput 
                title={'minutes'} 
                headline={'session length'}
                onChangeValue={onChangeSessionLength}
                inputValues={sessionLengthValues}/>
            <div className={styles['button-wrapper']}>
                <Button onClick={onStart}>
                    lets go
                </Button>
            </div>
        </div>
    );
};
StartScreen.propTypes = {} 
StartScreen.defaultProps = {}
export default StartScreen;