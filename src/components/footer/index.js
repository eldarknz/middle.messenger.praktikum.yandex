import Handlebars from "handlebars";
import template from "./footer.tmpl";
import "./footer.scss";

//Handlebars.registerPartial("footer", template);

const footer = () => {
    let compiled = Handlebars.compile(template);

    let data = {}

    let html = compiled(data);

    return html;
};

export default footer