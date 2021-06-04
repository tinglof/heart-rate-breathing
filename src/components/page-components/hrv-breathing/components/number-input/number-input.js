import React from 'react';
import styles from './number-input.module.scss';
import TextField from '@material-ui/core/TextField';

const NumberInput = ({ id, value, title, headline, onChange, min }) => {

    const onChangeLocal = (event) => {
        console.log(event.target.value);
        if(onChange && typeof onChange === 'function') {
            const value = event.target.value;
            const cleanedValue = value.replace(/[^\d.-]/g, '');
            onChange(cleanedValue);
        }
    }

    return (
        <div className={styles.wrapper}>
            {title && <p className={styles.title}>{title}</p>}
            {headline && <h2 className={styles.headline}>{headline}</h2>}
            <TextField
                id={id}
                className={styles['input-field']}
                type="number"
                value={value}
                lang="en"
                onChange={(e) => {onChangeLocal(e)}}
                inputProps={{
                    step: '0.5',
                    max: 300,
                    min: min,
                    lang: "en-US"
                }}
            />
        </div>
    );
};

NumberInput.defaultProps = {};

export default NumberInput;
