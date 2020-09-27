import React from 'react';
import styles from './button.module.scss';
import PropTypes from 'prop-types'

const Button = ({children, onClick}) => {
    return (
        <button onClick={onClick} className={styles.wrapper}>
            {children}
        </button>
    );
};
Button.propTypes = {
    onClick: PropTypes.func
} 

Button.defaultProps = {
    onClick: () => console.log("No func assigned"),
}
export default Button;