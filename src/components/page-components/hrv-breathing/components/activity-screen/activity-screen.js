import React, { useState } from 'react';
import styles from './activity-screen.module.scss';
import { motion, useCycle, AnimatePresence } from 'framer-motion';
import CountdownTimer from '../countdown-timer/countdown-timer';
import SecondsTimer from '../seconds-timer/seconds-timer';
import Button from '../button/button';
import {Howl, Howler} from 'howler';
import inhaleSoundWebm from 'sounds/inhale.webm';
import inhaleSoundMp3 from 'sounds/inhale.mp3'
import holdSoundWebm from 'sounds/hold.webm';
import holdSoundMp3 from 'sounds/hold.mp3';
import exhaleSoundWebm from 'sounds/exhale.webm';
import exhaleSoundMp3 from 'sounds/exhale.mp3';
import finishWebm from 'sounds/finish.webm';
import finishMp3 from 'sounds/finish.mp3';


const ActivityScreen = ({inBreath, postInhaleHold, outBreath, postExhaleHold, sessionLength, back}) => {
    const [running, setRunning] = useState(true);

    const inBreathInMs = inBreath * 1000;
    const outBreathInMs  = outBreath * 1000;
    const postInhaleHoldInMs = postInhaleHold ? postInhaleHold * 1000 : 0;
    const postExhaleHoldInMs = postExhaleHold ? postExhaleHold * 1000 : 0;

    const buildAnimationCycle = () => {
        const animationCycle = [];
        animationCycle.push(
            {
                animation: {
                    animate: {rotate: [0, 180]},
                    transition: { duration: inBreath, ease: 'easeInOut'}
                },
                colorAnimation: {
                    animate: {background: '#6878EA'},
                    transition: {duration: 1, ease: 'easeIn'}
                },
                timer: Number.isInteger(inBreath) ? inBreath : null,
                soundOnStart: inhaleSound,
                maxSoundDurationInMs: inBreath * 1000,
                text: 'inhale',
            }
        )

        if(postInhaleHold) {
            animationCycle.push(
                {
                    animation: null,
                    colorAnimation: {
                        animate: {background: '#b7bff5'},
                        transition: {duration: 0.35, ease: 'easeIn'}
                    },
                    soundOnStart: holdSoundInhale,
                    text: 'hold',
                    maxSoundDurationInMs: postInhaleHoldInMs,
                    timer: postInhaleHold
                }
            )
        }

        animationCycle.push(
            {
                animation: {
                    animate: { rotate: [180, 360]},
                    transition: { duration: outBreath, ease: 'easeInOut'}
                },
                colorAnimation: {
                    animate: {background: '#6878EA'},
                    transition: {duration: 1, ease: 'easeIn'}
                },
                timer: Number.isInteger(outBreath) ? outBreath : null,
                soundOnStart: exhaleSound,
                maxSoundDurationInMs: outBreath * 1000,
                text: 'exhale',
            }
        );

        if(postExhaleHold) {
            animationCycle.push(
                {
                    animation: null,
                    colorAnimation: {
                        animate: {background: '#b7bff5'},
                        transition: {duration: 0.35, ease: 'easeIn'}
                    },
                    soundOnStart: holdSoundExhale,
                    maxSoundDurationInMs: postExhaleHoldInMs,
                    text: 'hold',
                    timer: postExhaleHold
                }
            )
        }

        return animationCycle;
    }

    const finishSound = new Howl({
        src: [finishMp3, finishWebm],
        volume: 0.5
    })

    const inhaleSound = new Howl({
        src: [inhaleSoundMp3, inhaleSoundWebm],
        sprite: {
          adjustedSound: [0, inBreathInMs]
        }
    });

    const exhaleSound = new Howl({
        src: [exhaleSoundMp3, exhaleSoundWebm],
        sprite: {
          adjustedSound: [0, outBreathInMs]
        }
    });

    const holdSoundInhale = new Howl({
        src: [holdSoundMp3, holdSoundMp3],
        sprite: {
          adjustedSound: [0, postInhaleHoldInMs]
        }
    })

    const holdSoundExhale = new Howl({
        src: [holdSoundMp3, holdSoundWebm],
        sprite: {
          adjustedSound: [0, postExhaleHoldInMs]
        }
    })

    const [animationState, updateCycle] = useCycle(...buildAnimationCycle());

    React.useEffect( () => {
        if(running && animationState.soundOnStart) {
            const soundId = animationState.soundOnStart.play('adjustedSound');
            animationState.soundOnStart.fade(1, 0, animationState.maxSoundDurationInMs, soundId);
        } else {
            finishSound.play();
        }
    }, [animationState, finishSound, running])

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
                            {
                                animationState.timer &&
                                <div className={styles['timer-wrapper']}>
                                    <SecondsTimer 
                                        onCountDownEnd={() => {
                                            if(running) {
                                                updateCycle();
                                            }
                                        }} 
                                        intialTimeInSeconds={animationState.timer} />
                                </div>
                            }  
                        </motion.div>
                    </div>
                </AnimatePresence>
                <motion.div 
                    {...animationState.animation}
                    onAnimationComplete={() => {
                        console.log(running);
                        if(running && !animationState.timer) {
                            updateCycle();
                        }
                    }}
                    className={styles.circle}
                >
                    <motion.div {...animationState.colorAnimation} className={styles.indicator} />
                </motion.div>
            </div>
            {   
                typeof sessionLength === "number" && sessionLength > 0 && 
                <div className={styles.countdown}>
                    <CountdownTimer onCountDownEnd={() => setRunning(false)} intialTimeInSeconds={sessionLength * 60} />
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