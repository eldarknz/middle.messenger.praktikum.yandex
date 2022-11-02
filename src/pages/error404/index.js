import Handlebars from "handlebars";
import template from "./error404.tmpl";

export default () => {
    const compiled = Handlebars.compile(template);

    const html = compiled({
        title: "404",
        text: "Не туда попали",
    });

    return html;
};
