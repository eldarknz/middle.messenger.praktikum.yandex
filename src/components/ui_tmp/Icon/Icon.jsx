import React from "react";

import iconMap from "./assets/icons.map";

const Icon = ({name, size = 24, className}) => {
    if (!name) return null;

    const Icon = iconMap[name];

    return (
        <Icon height={size} width={size} className={className} />
    )
}

export default Icon;