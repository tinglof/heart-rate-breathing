import React, { Component} from 'react';
import styles from './hrv-breathing.module.scss';
import StartScreen from './components/start-screen/start-screen';
import ActivityScreen from './components/activity-screen/activity-screen';

const IN_BREATH_VALUES = [4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 9, 10];
const OUT_BREATH_VALUES = [5, 5.5, 6, 6.5, 7, 7.5, 8, 9, 10, 11, 12, 13, 14];
const SESSION_LENGTH_VALUES = ['off', 10, 15, 20, 25, 30, 35, 40, 45];

export default class HrvBreathing extends Component {

    constructor(props) {
        super(props);

        this.state = {
            step: 1,
            inBreath: IN_BREATH_VALUES[0],
            outBreath: OUT_BREATH_VALUES[0],
            sessionLength: SESSION_LENGTH_VALUES[0],
        }

        this.onChangeInBreath = this.onChangeInBreath.bind(this);
        this.onChangeOutBreath = this.onChangeOutBreath.bind(this);
        this.onChangeSessionLength = this.onChangeSessionLength.bind(this);
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

    renderStep = () => {
        switch(this.state.step) {
            case 1:
                return <StartScreen 
                        inBreathValues={IN_BREATH_VALUES}
                        outBreathValues={OUT_BREATH_VALUES}
                        sessionLengthValues={SESSION_LENGTH_VALUES}
                        onStart={() => this.setState({step: 2})}
                        onChangeSessionLength={this.onChangeSessionLength}
                        onChangeInBreath={this.onChangeInBreath} 
                        onChangeOutBreath={this.onChangeOutBreath}/>
            case 2:
                return <ActivityScreen 
                        back={() => this.setState({step: 1})}
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