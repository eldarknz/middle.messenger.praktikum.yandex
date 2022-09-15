import Handlebars from "handlebars";
import template from "./test.tmpl";

export default (value) => {
    console.log(value);
    let compiled = Handlebars.compile(template);

    let data = {}

    let html = compiled(data);

    return html;
};