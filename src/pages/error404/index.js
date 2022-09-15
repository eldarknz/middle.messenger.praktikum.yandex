import Handlebars from "handlebars";
import template from "./error404.tmpl";
import "./styles.scss";

export default () => {
    let compiled = Handlebars.compile(template);

    let data = {
        title: "404",
        text: "Не туда попали",
    };

    let html = compiled(data);

    return html;
};