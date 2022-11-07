import Handlebars from "handlebars";
import template from "./nav.tmpl.js"
import "./nav.scss";

export const Nav = (list) => {
    const compiled = Handlebars.compile(template);

    const html = compiled({list});

    return html;
};
