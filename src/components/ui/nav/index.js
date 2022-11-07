import Handlebars from "handlebars";

import "./nav.scss";

export const Nav = (list) => {
    const compiled = Handlebars.compile(template);

    const html = compiled({list});

    return html;
};
