import React, { Component } from 'react';
import styles from './hrv-breathing.module.scss';
import StartScreen from './components/start-screen/start-screen';
import ActivityScreen from './components/activity-screen/activity-screen';
import NoSleep from 'external-packages/NoSleep.js';

export default class HrvBreathing extends Component {

    constructor(props) {
        super(props);

        this.state = {
            step: 1,
            inBreath: 5.5,
            postInhaleHold: 0,
            outBreath: 5.5,
            postExhaleHold: 0,
            sessionLength: 10,
        }

        this.nosleep = null;

        this.onChangeInBreath = this.onChangeInBreath.bind(this);
        this.onChangePostInhaleHold = this.onChangePostInhaleHold.bind(this);
        this.onChangeOutBreath = this.onChangeOutBreath.bind(this);
        this.onChangePostExhaleHold = this.onChangePostExhaleHold.bind(this);
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

    componentDidMount() {
        if(localStorage) {
            const inBreath = localStorage.getItem('ib');
            const inBreathHold = localStorage.getItem('ibh');
            const outBreath = localStorage.getItem('ob');
            const outBreathHold = localStorage.getItem('obh');
            const length = localStorage.getItem('length');

            this.setState({
                inBreath: inBreath ? Number(inBreath) : this.state.inBreath,
                postInhaleHold: inBreathHold ? Number(inBreathHold) : this.state.postInhaleHold,
                outBreath: outBreath ? Number(outBreath) : this.state.outBreath,
                postExhaleHold: outBreathHold ? Number(outBreathHold) : this.state.postExhaleHold,
                sessionLength: length ? Number(length) : this.state.sessionLength
            })
        }
    }

    setLocalStorageValue(key, value) {
        if(localStorage) {
            localStorage.setItem(key, value);
        }
    }

    onChangeInBreath(value) {
        const valueAsFloat = parseFloat(value);
        const newValue = isNaN(valueAsFloat) ? "" : valueAsFloat;
        this.setLocalStorageValue('ib', newValue);
        this.setState({inBreath: newValue });
        
    }

    onChangePostInhaleHold(value) {
        const valueAsFloat = parseFloat(value);
        const newValue = isNaN(valueAsFloat) ? "" : valueAsFloat;
        this.setLocalStorageValue('ibh', newValue);
        this.setState({postInhaleHold: newValue});
    }

    onChangeOutBreath(value) {
        const valueAsFloat = parseFloat(value);
        const newValue = isNaN(valueAsFloat) ? "" : valueAsFloat;
        this.setLocalStorageValue('ob', newValue);
        this.setState({outBreath: newValue});
    }

    onChangePostExhaleHold(value) {
        const valueAsFloat = parseFloat(value);
        const newValue = isNaN(valueAsFloat) ? "" : valueAsFloat;
        this.setLocalStorageValue('obh', newValue);
        this.setState({postExhaleHold: newValue});
    }

    onChangeSessionLength(value) {
        const valueAsFloat = parseFloat(value);
        const newValue = isNaN(valueAsFloat) ? "" : valueAsFloat;
        this.setLocalStorageValue('length', newValue);
        this.setState({sessionLength: newValue});
    }

    renderStep() {
        switch(this.state.step) {
            case 1:
                return <StartScreen 
                            inBreath={this.state.inBreath}
                            postInhaleHold={this.state.postInhaleHold}
                            outBreath={this.state.outBreath}
                            postExhaleHold={this.state.postExhaleHold} 
                            sessionLength={this.state.sessionLength} 
                            onStart={() => {this.setState({step: 2}); this.enableNoSleep();}}
                            onChangeSessionLength={this.onChangeSessionLength}
                            onChangeInBreath={this.onChangeInBreath} 
                            onChangePostInhaleHold={this.onChangePostInhaleHold}
                            onChangeOutBreath={this.onChangeOutBreath}
                            onChangePostExhaleHold={this.onChangePostExhaleHold}
                        />
                        
            case 2:
                return <ActivityScreen 
                        back={() => {this.setState({step: 1}); this.disableNoSleep(); }}
                        inBreath={this.state.inBreath}
                        postInhaleHold={this.state.postInhaleHold === 0 ? null : this.state.postInhaleHold}
                        outBreath={this.state.outBreath}
                        postExhaleHold={this.state.postExhaleHold === 0 ? null : this.state.postExhaleHold}
                        sessionLength={this.state.sessionLength}/>
            default: 
                return null;
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