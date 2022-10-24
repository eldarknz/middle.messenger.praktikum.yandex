import React from 'react';
import cn from 'classnames';

import { iconsLibrary } from './Icons.lib';

import styles from './Icon.module.css'

export const Icon = ({ name, size, className}) => {

    let iconClassNames = cn(
        styles.icon,
    );
    
    const props = {
        focusable: 'false',
        ...(size? { width: size, height: size } : null),
        ...(className? { className } : null)
    };

    const resultIcon = iconsLibrary[name] ? iconsLibrary[name](props) : null;

    return resultIcon ? <div className={iconClassNames}>{resultIcon}</div> : null;
}