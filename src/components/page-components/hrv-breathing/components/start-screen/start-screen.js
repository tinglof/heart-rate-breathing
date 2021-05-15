import React from 'react';
import styles from './start-screen.module.scss';
import SwipeInput from '../swipe-input/swipe-input';
import Button from '../button/button';


const StartScreen = ({onChangeInBreath, onChangePostInhaleHold, onChangeOutBreath, onChangePostExhaleHold, onChangeSessionLength, onStart, 
                        inBreathValues, postInhaleHoldValues, outBreathValues, postExhaleHoldValues, sessionLengthValues }) => {
    return (
        <div className={styles.wrapper}>
            <h1 className={[styles.headline, 'hero-heading'].join(" ")}>Breathe</h1>
            <SwipeInput 
                id={'inBreath'}
                title={'seconds'}
                headline={'breath in'} 
                onChangeValue={onChangeInBreath}
                inputValues={inBreathValues}/>
            <SwipeInput 
                id={'postInhaleHold'}
                title={'seconds'}
                headline={'post inhale hold'} 
                onChangeValue={onChangePostInhaleHold}
                inputValues={postInhaleHoldValues}/>
            <SwipeInput 
                id={'outBreath'}
                title={'seconds'} 
                headline={'breath out'}
                onChangeValue={onChangeOutBreath}
                inputValues={outBreathValues}/>
            <SwipeInput 
                id={'postExhaleHold'}
                title={'seconds'} 
                headline={'post exhale hold'}
                onChangeValue={onChangePostExhaleHold}
                inputValues={postExhaleHoldValues}/>
            <SwipeInput 
                id={'sessionLength'}
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