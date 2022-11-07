import Handlebars from "handlebars";
import template from "./login.tmpl";
import "../../components/ui/Button";
import "../../components/ui/Label";
import input from "../../components/ui/Input";

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
