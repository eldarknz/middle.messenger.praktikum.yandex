import Handlebars from "handlebars";
import template from "./nav.tmpl";
import "./nav.scss";

const nav = (list) => {
    let compiled = Handlebars.compile(template);

    let html = compiled({list});

    return html;
};

export default nav