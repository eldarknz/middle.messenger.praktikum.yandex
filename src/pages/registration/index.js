import Handlebars from "handlebars";
import template from "./registration.tmpl";
import "../../components/ui/button";
import "../../components/ui/input";
import "./styles.scss";

export default () => {
    let compiled = Handlebars.compile(template);

    let data = {
        title: "Регистрация"
    };

    let html = compiled(data);

    return html;
};