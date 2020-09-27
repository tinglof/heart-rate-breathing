import React, { useState } from  'react';
import styles from './box-breathing.module.scss';
import { motion, useCycle } from "framer-motion";
import { INHALE, EXHALE, HOLD_POST_INHALE, HOLD_POST_EXHALE } from "constants/breathing-constants";


const BoxBreathing = (props) => {

    const [animationObj, updateCycle] = useCycle(
        {
            animation: {
                animate: {x: 320},
                transition: { duration: 4, ease: 'linear'}
            },
            step: 1
        },
        {
            animation: {
                animate: { y: 240},
                transition: { duration: 4, ease: 'linear'}
            },
            step: 2

        },
        {
            animation: {
                animate: { x: 0},
                transition: { duration: 4, ease: 'linear'}
            },
            step: 3

        },
        {
            animation: {
                animate: { y: 0},
                transition: { duration: 4, ease: 'linear'}
            },
            step: 4
        });


    return (
        <div className={styles.wrapper}>

            <h1 className={[styles.headline, 'hero-heading'].join(" ")}>Box Breathing</h1>

            <div className={styles.box}>
                <div className={styles.animationBox}>
                    <motion.div
                        className={styles['progress-dot']}
                        {...animationObj.animation}
                        onAnimationComplete={() => updateCycle()}
                    />
                    <p className={[styles.instruction, styles.inhale, animationObj.step === 1 ? styles.active : ""].join(" ")}>Inhale</p>
                    <p className={[styles.instruction, styles['hold-post-inhale'], animationObj.step === 2 ? styles.active : ""].join(" ")}>Hold</p>
                    <p className={[styles.instruction, styles.exhale, animationObj.step === 3 ? styles.active : ""].join(" ")}>Exhale</p>
                    <p className={[styles.instruction, styles['hold-post-exhale'], animationObj.step === 4 ? styles.active : ""].join(" ")}>Hold</p>

                </div>
            </div>

        </div>
    )


}

export default BoxBreathing;

BoxBreathing.defaultProps = {
    inhale: 4,
    exhale: 4,
    holdPostInhale: 4,
    holdPostExhale: 4
}
