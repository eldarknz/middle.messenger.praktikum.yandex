import React, { useState } from 'react';

import cn from 'classnames';

import Icon from '../Icon/Icon';

import styles from './Checkbox.module.css';

export const Checkbox = ({ value, label, checked = false, disabled }) => {

    const [stateChecked, setStateChecked] = useState(checked);
    const [inputFocus, setInputFocus] = useState(false);

    const isChecked = checked ? checked : checked;

    const handleOnChange = (event) => {
        const checked = event.target.checked;
        setStateChecked(checked);
    };

    const handleOnFocus = () => {
        setInputFocus(true);
    };

    const handleOnBlur = () => {
        setInputFocus(false);
    }

    return (
    
        <div className={styles.field}>
            <label className={styles.container}>
                <input
                    type="checkbox"
                    checked={stateChecked}
                    aria-checked={stateChecked}
                    disabled={disabled}
                    onChange={handleOnChange}
                    onFocus={handleOnFocus}
                    onBlur={handleOnBlur}
                    className={styles.input}
                />
                <div className={cn(styles.checkmark, {
                        [styles.checked]: stateChecked,
                        [styles.disabled]: disabled,
                        [styles.focused]: inputFocus
                    })}>
                    {/*
                        isChecked && <Icon name={"checkbox_accept"} size={20} className={styles.checkedIcon}/>
                    */}
                </div>
                <div className={styles.text}>{label}</div>
            </label>
        </div>
    );
};

export default Checkbox;