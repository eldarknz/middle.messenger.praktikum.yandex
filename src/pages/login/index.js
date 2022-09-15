import Handlebars from "handlebars";
import template from "./login.tmpl";
import "../../components/button";
import "../../components/input_search";
import "../../components/label";
import "./styles.scss";

export default () => {
    let compiled = Handlebars.compile(template);

    let data = {
        title: "Вход",
        buttonText: "Авторизоваться",
    };

    let html = compiled(data);

    return html;
};