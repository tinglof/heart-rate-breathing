import React, { useState } from 'react';
import styles from './activity-screen.module.scss';
import { motion, useCycle, AnimatePresence } from 'framer-motion';
import CountdownTimer from '../countdown-timer/countdown-timer';
import Button from '../button/button';
import {Howl, Howler} from 'howler';
import bellOneSoundWebm from 'sounds/bell_one.webm';
import bellTwoSoundWebm from 'sounds/bell_two.webm';
import bellOneSoundMp3 from 'sounds/bell_one.mp3';
import bellTwoSoundMp3 from 'sounds/bell_two.mp3';
import kyotoBellMp3 from 'sounds/kyoto-bell-2.mp3';
import kyotoBellWebm from 'sounds/kyoto-bell-2.webm';
import doneMp3 from 'sounds/done.mp3';
import doneWebm from 'sounds/done.webm';


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
                timer: null,
                soundOnStart: soundTwo,
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
                    soundOnStart: postInhaleHoldSound,
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
                soundOnStart: soundOne,
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
                    soundOnStart: postExhaleHoldSound,
                    maxSoundDurationInMs: postExhaleHoldInMs,
                    text: 'hold',
                    timer: postExhaleHold
                }
            )
        }

        return animationCycle;
    }

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

    const postInhaleHoldSound = new Howl({
        src: [kyotoBellMp3, kyotoBellWebm],
        sprite: {
          adjustedSound: [0, postInhaleHoldInMs]
        }
    })

    const postExhaleHoldSound = new Howl({
        src: [kyotoBellMp3, kyotoBellWebm],
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
            doneSound.play();
        }
    }, [animationState, doneSound, inBreathInMs, running])

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
                                    <CountdownTimer format={'ss'} onCountDownEnd={() => updateCycle()} intialTimeInSeconds={animationState.timer} />
                                </div>
                            }  
                        </motion.div>
                    </div>
                </AnimatePresence>
                <motion.div 
                    {...animationState.animation}
                    onAnimationComplete={() => {
                        if(running) {
                            updateCycle();
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