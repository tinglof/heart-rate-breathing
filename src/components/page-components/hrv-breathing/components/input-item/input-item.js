import React from 'react';
import styles from './input-item.module.scss';

const InputItem = ({ onClick, value, visible, style }) => (
    <div style={style} className={[styles.item, visible ? styles.visible : ""].join(" ")} onClick={onClick}>
      <div className={styles.value}>
          {value}
      </div>
    </div>
);

export default InputItem;