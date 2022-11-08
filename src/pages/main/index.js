import Handlebars from "handlebars";
import template from "./main.tmpl";

export default () => {
    const compiled = Handlebars.compile(template);

    const html = compiled({});

    return html;
};
