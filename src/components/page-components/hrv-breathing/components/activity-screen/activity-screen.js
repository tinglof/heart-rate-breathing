import React, { useState } from 'react';
import styles from './activity-screen.module.scss';
import PropTypes from 'prop-types'
import { motion, useCycle, AnimatePresence } from 'framer-motion';
import CountdownTimer from '../countdown-timer/countdown-timer';
import Button from '../button/button';
import {Howl, Howler} from 'howler';
import bellOneSoundFile from 'sounds/bell_one.webm';
import bellTwoSoundFile from 'sounds/bell_two.webm';

const ActivityScreen = ({inBreath, outBreath, sessionLength, back}) => {

    const [running, setRunning] = useState(true);

    const inBreathInMs = inBreath * 1000;
    const outBreathInMs  = outBreath * 1000;

    const soundOne = new Howl({
        src: [bellOneSoundFile],
        sprite: {
          adjustedSound: [0, inBreathInMs]
        }
      });

      const soundTwo = new Howl({
        src: [bellTwoSoundFile],
        sprite: {
          adjustedSound: [0, outBreathInMs]
        }
      });
      
      // Shoot the laser!


    const [animationState, updateCycle] = useCycle(
        {
            animation: {
                animate: {rotate: [0, 180]},
                transition: { duration: inBreath, ease: 'easeInOut'}
            },
            colorAnimation: {
                animate: {background: '#6878EA'},
                transition: {duration: 1.8, ease: 'easeIn'}
            },
            step: 1,
            soundOnComplete: soundOne,
            text: 'inhale',
        },
        {
            animation: {
                animate: { rotate: [180, 360]},
                transition: { duration: outBreath, ease: 'easeInOut'}
            },
            colorAnimation: {
                animate: {background: '#5264e7'},
                transition: {duration: 1.8, ease: 'easeIn'}
            },
            step: 2,
            soundOnComplete: soundTwo,
            text: 'exhale',
        });

    return (
        <div className={styles.wrapper}>
            <h1 className={[styles.headline, 'hero-heading'].join(" ")}>Breathe</h1>
            
            <div className={styles['circle-wrapper']}>
                <AnimatePresence>
                    <div className={styles['state-text-wrapper']}>
                        <motion.div
                            key={animationState.text}
                            className={styles['state-text']}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{duration: 1, ease: 'easeInOut'}}
                            exit={{ opacity: 0 }}
                        >
                            {animationState.text}    
                        </motion.div>
                    </div>
                </AnimatePresence>
                <motion.div 
                    {...animationState.animation}
                    onAnimationComplete={() => {
                        if(running) {
                            updateCycle();
                            const id = animationState.soundOnComplete.play('adjustedSound');
                            animationState.soundOnComplete.fade(1, 0, inBreathInMs, id);
                        }
                    }}
                    className={styles.circle}
                >
                    <motion.div {...animationState.colorAnimation} className={styles.indicator} />
                </motion.div>
            </div>
            {   
                sessionLength && typeof sessionLength === "number" &&
                <div className={styles.countdown}>
                    <CountdownTimer onCountDownEnd={() => setRunning(false)} intialTimeInMin={sessionLength} />
                </div>
            }

            <div className={styles['button-wrapper']}>
                <Button onClick={() => {back(); Howler.stop();}}>
                    back to main
                </Button>
            </div>
            
        </div>
    );
};
ActivityScreen.propTypes = {} 
ActivityScreen.defaultProps = {
    inBreath: 4,
    outBreath: 6
}
export default ActivityScreen;