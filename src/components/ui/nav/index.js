import Handlebars from "handlebars";
import template from "./Nav.tmpl.js"
import "./Nav.scss";

export const Nav = (list) => {
    const compiled = Handlebars.compile(template);

    const html = compiled({list});

    return html;
};
