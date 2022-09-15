import React from 'react';

import cn from 'classnames';

import styles from "./Button.module.css";

export const Button = ({
    value,
    disabled,
    loading,
    loadingText = "Загрузка...",
    block,
    icon,
    onClick,
    className
}) => {

    const buttonClassName = cn(
        styles.button,
        {
            [styles.block]: block,
            [styles.disabled]: disabled || loading,
            [styles.loading]: loading
        },
        className
    );

    const buttonContent = (
        <div className={styles.content}>
            {(loading || value) && (<div className={cn(styles.content, styles.text)}>
                {loading && loadingText ? loadingText : value}
            </div>)}
        </div>
    )

    return (
        <button
            className={buttonClassName}
            disabled={disabled}
            onClick={disabled || loading ? undefined : onClick}
        >
            {buttonContent}
        </button>
    );
}