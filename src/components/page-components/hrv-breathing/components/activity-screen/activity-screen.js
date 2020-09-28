import React, { useState } from 'react';
import styles from './activity-screen.module.scss';
import PropTypes from 'prop-types'
import { motion, useCycle, AnimatePresence } from 'framer-motion';
import CountdownTimer from '../countdown-timer/countdown-timer';
import Button from '../button/button';
import {Howl, Howler} from 'howler';
import bellOneSoundWebm from 'sounds/bell_one.webm';
import bellTwoSoundWebm from 'sounds/bell_two.webm';
import bellOneSoundMp3 from 'sounds/bell_one.mp3';
import bellTwoSoundMp3 from 'sounds/bell_two.mp3';
import doneMp3 from 'sounds/done.mp3';
import doneWebm from 'sounds/done.webm';


const ActivityScreen = ({inBreath, outBreath, sessionLength, back}) => {

    const [running, setRunning] = useState(true);

    const inBreathInMs = inBreath * 1000;
    const outBreathInMs  = outBreath * 1000;

    const doneSound = new Howl({
        src: [doneWebm, doneMp3],
        volume: 0.5
    })

    const soundOne = new Howl({
        src: [bellOneSoundWebm, bellOneSoundMp3],
        sprite: {
          adjustedSound: [0, inBreathInMs]
        }
    });

      const soundTwo = new Howl({
        src: [bellTwoSoundWebm, bellTwoSoundMp3],
        sprite: {
          adjustedSound: [0, outBreathInMs]
        }
    });

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
                        } else {
                            doneSound.play();
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