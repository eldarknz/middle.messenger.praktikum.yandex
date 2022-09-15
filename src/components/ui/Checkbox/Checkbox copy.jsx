import React, { useState } from 'react';

import cn from 'classnames';

import { Icon, IconProps } from '../Icon/Icon';

import styles from './Checkbox.module.css';

export const Checkbox = ({ name, value, label, defaultChecked, checked, disabled, onChange, onBlur}) => {

    const [inputFocus, setInputFocus] = useState(false);

    const uncontrolled = checked === undefined;

    const [stateChecked, setStateChecked] = useState(defaultChecked);

    const isChecked = uncontrolled ? stateChecked : checked;

    const handleOnChange = (event) => {
        const checked = event.target.checked;
        if (uncontrolled) {
            setStateChecked(checked);
        }
        //onChange?.(checked);
    };

    const handleOnFocus = () => {
        setInputFocus(true);
    };

    const handleOnBlur = (event) => {
        setInputFocus(false);
        //onBlur?.(event);
    }

    return (
        <div className={styles.field}>
            <label className={styles.label}>
                <input
                    type="checkbox"
                    value={value}
                    aria-checked={isChecked}
                    disabled={disabled}
                    onChange={handleOnChange}
                    onFocus={handleOnFocus}
                    onBlur={handleOnBlur}
                    className={styles.input}
                />
                <div className={cn(styles.checkbox, {
                        [styles.checked]: checked,
                        [styles.disabled]: disabled,
                        [styles.focused]: inputFocus
                    })}>
                    { isChecked && <Icon
                            name="check"
                            size={18}
                            className={styles.icon}
                    />}
                </div>
                <div className={styles.text}>{label}</div>
            </label>
        </div>
    );
};

export default Checkbox;