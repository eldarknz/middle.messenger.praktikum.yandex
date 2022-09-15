import Handlebars from "handlebars";
import template from "./registration.tmpl";
import "../../components/button";
import "../../components/input";
import "./styles.scss";

export default () => {
    let compiled = Handlebars.compile(template);

    let data = {
        title: "Регистрация",
        buttonText: "Зарегистрироваться",
    };

    let html = compiled(data);

    return html;
};