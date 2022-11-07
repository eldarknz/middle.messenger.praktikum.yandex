import Handlebars from "handlebars";
import template from "./nav.tmpl.js"
import "./nav.scss";

export const nav = (list) => {
    const compiled = Handlebars.compile(template);

    const html = compiled({list});

    return html;
};
