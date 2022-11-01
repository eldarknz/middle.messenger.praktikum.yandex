import Handlebars from "handlebars";
import template from "./login.tmpl";
import "../../components/ui/button";
import "../../components/ui/label";
import input from "../../components/ui/input";

export default () => {
    const compiled = Handlebars.compile(template);

    const html = compiled({
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
    });

    return html;
};
