import Handlebars from "handlebars";

Handlebars.registerHelper('getIconElement', (iconType, size, color) => {
    console.log(iconType, size, color);
    console.log(typeof iconType);
    //return new Handlebars.SafeString(`<div>${str1}</div>`);
    let className = "icon";

    if (size) className += ` ${size}`;
    if (color) className += ` ${color}`;
        
    return new Handlebars.SafeString(`<div class="${className}">${iconType || ''}</div>`);
});
