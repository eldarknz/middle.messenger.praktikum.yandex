import Handlebars from "handlebars";
import template from "./error500.tmpl";
import "./styles.scss";

export default () => {
    let compiled = Handlebars.compile(template);

    let data = {
        title: "500",
        text: "Мы уже фиксим",
    };

    let html = compiled(data);

    return html;
};