import React, { Component} from 'react';
import styles from './hrv-breathing.module.scss';
import StartScreen from './components/start-screen/start-screen';
import ActivityScreen from './components/activity-screen/activity-screen';
import NoSleep from 'external-packages/NoSleep.js';

const IN_BREATH_VALUES = [2, 3, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 9, 10];
const OUT_BREATH_VALUES = [5, 5.5, 6, 6.5, 7, 7.5, 8, 9, 10, 11, 12, 13, 14, 15, 20, 25];
const SESSION_LENGTH_VALUES = ['off', 3, 5, 10, 15, 20, 25, 30, 35, 40, 45];

export default class HrvBreathing extends Component {

    constructor(props) {
        super(props);

        this.state = {
            step: 1,
            inBreath: IN_BREATH_VALUES[0],
            outBreath: OUT_BREATH_VALUES[0],
            sessionLength: SESSION_LENGTH_VALUES[0],
        }

        this.nosleep = null;

        this.onChangeInBreath = this.onChangeInBreath.bind(this);
        this.onChangeOutBreath = this.onChangeOutBreath.bind(this);
        this.onChangeSessionLength = this.onChangeSessionLength.bind(this);
    }

    

        
    enableNoSleep() {
        if (this.nosleep) {
            this.nosleep.disable(); // Just to be sure if you forgot to disable.
        }
        
        this.nosleep = new NoSleep();
        this.nosleep.enable();
        console.log("Nosleep enabled");
    }

    disableNoSleep() {
        if(this.nosleep) {
            this.nosleep.disable();
        }
    }

    onChangeInBreath(value) {
        if(!value) {
            return;
        }
        
        if(value !== this.state.inBreath) {
             this.setState({inBreath: value});
        }
        
    }

    onChangeOutBreath(value) {
        if(!value) {
            return;
        }

        if(value !== this.state.outBreath) {
            this.setState({outBreath: value});
        }
    }

    onChangeSessionLength(value) {
        if(!value) {
            return;
        }

        if(value !== this.state.sessionLength) {
            this.setState({sessionLength: value});
        }
    }

    renderStep() {
        switch(this.state.step) {
            case 1:
                return <StartScreen 
                        inBreathValues={IN_BREATH_VALUES}
                        outBreathValues={OUT_BREATH_VALUES}
                        sessionLengthValues={SESSION_LENGTH_VALUES}
                        onStart={() => {this.setState({step: 2}); this.enableNoSleep();}}
                        onChangeSessionLength={this.onChangeSessionLength}
                        onChangeInBreath={this.onChangeInBreath} 
                        onChangeOutBreath={this.onChangeOutBreath}/>
            case 2:
                return <ActivityScreen 
                        back={() => {this.setState({step: 1}); this.disableNoSleep(); }}
                        inBreath={this.state.inBreath}
                        outBreath={this.state.outBreath}
                        sessionLength={this.state.sessionLength}/>
        }
    }

    render() {
        return (
            <div className={styles.wrapper}>
                <div className={styles['inner-wrapper']}>
                    {
                        this.renderStep()
                    }
                </div>
            </div>
          
        );
    }
}