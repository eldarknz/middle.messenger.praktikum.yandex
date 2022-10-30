import Handlebars from "handlebars";
import template from "./login.tmpl";
import "../../components/ui/button";
import "../../components/ui/label";
import "./styles.scss";
import input from "../../components/ui/input";

export default () => {
    let compiled = Handlebars.compile(template);

    let data = {
        title: "Вход",
        loginInput: input({
            alternative: true,
            id: "login",
            name: "login",
            placeholderText: "Логин",
        }),
        passwordInput: input({
            alternative: true,
            id: "password",
            name: "password",
            type: "password",
            placeholderText: "Пароль",
        })
    };

    let html = compiled(data);

    return html;
};