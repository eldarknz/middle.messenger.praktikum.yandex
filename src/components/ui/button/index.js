import Handlebars from "handlebars";
import template from "./button.tmpl";
import "./button.scss";

Handlebars.registerPartial("button", template);

export default (className, id, content) => {
    return Handlebars.compile(template)({className, id, content});
}