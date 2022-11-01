import Handlebars from "handlebars";
import template from "./error500.tmpl";

export default () => {
    const compiled = Handlebars.compile(template);

    const html = compiled({
        title: "500",
        text: "Мы уже фиксим",
    });

    return html;
};
