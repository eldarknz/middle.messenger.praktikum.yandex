import Handlebars from "handlebars";
import template from "./nav.tmpl";
import "./nav.scss";

const nav = (list) => {
    const compiled = Handlebars.compile(template);

    const html = compiled({list});

    return html;
};

export default nav
