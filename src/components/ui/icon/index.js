import Handlebars from "handlebars";
import template from "./icon.tmpl";
import "./icon.scss";

Handlebars.registerPartial("icon", template);

const icon = (size, color, iconType) => {
    return Handlebars.compile(template)({size, color, iconType});
}


export default icon