import React from 'react';
import styles from './start-screen.module.scss';
import NumberInput from '../number-input/number-input';
import Button from '../button/button';


const StartScreen = (
    { 
        onChangeInBreath, onChangePostInhaleHold, onChangeOutBreath, onChangePostExhaleHold, onChangeSessionLength, onStart,
        inBreath, postInhaleHold, outBreath, postExhaleHold, sessionLength 
    }) => {
    
        return (
        <div className={styles.wrapper}>
            <h1 className={[styles.headline, 'hero-heading'].join(" ")}>Breathe</h1>
            <NumberInput 
                value={inBreath}
                id={'inBreath'}
                title={'seconds'}
                headline={'breath in'}
                min={1}
                onChange={onChangeInBreath}
            />
            <NumberInput 
                value={postInhaleHold}
                id={'postInhaleHold'}
                title={'seconds'}
                headline={'post inhale hold'}
                min={0}
                onChange={onChangePostInhaleHold}
            />
            <NumberInput 
                value={outBreath}
                id={'outBreath'}
                title={'seconds'} 
                headline={'breath out'}
                min={1}
                onChange={onChangeOutBreath}
            />
            <NumberInput 
                value={postExhaleHold}
                id={'postExhaleHold'}
                title={'seconds'} 
                headline={'post exhale hold'}
                min={0}
                onChange={onChangePostExhaleHold}
            />
            <NumberInput 
                value={sessionLength}
                id={'sessionLength'}
                title={'minutes'} 
                headline={'session length'}
                min={0}
                onChange={onChangeSessionLength}
            />
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