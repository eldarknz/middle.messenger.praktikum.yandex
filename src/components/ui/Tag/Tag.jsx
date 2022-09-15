import React from 'react';

import cn from 'classnames';

import styles from "./Tag.module.css";

export const Tag = ({
    color,
    className
}) => {

    const tagClassName = cn(
        styles.tag,
        styles[color],
        className
    );

    return (
        <div className={tagClassName} />
    );
}