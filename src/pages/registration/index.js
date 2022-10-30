import Handlebars from "handlebars";
import template from "./registration.tmpl";
import input from "../../components/ui/input";
import "../../components/ui/button";
import "../../components/ui/input";
import "./styles.scss";

export default () => {
    let compiled = Handlebars.compile(template);

    let data = {
        title: "Регистрация",
        emailInput: input({
            type: "email", placeholderText: "Почта", name: "email", id: "email", alternative: "true"
        }),
        loginInput: input({
            type: "text", placeholderText: "Логин", name: "login", id: "login", alternative: "true"
        }),
        firstNameInput: input({
            type: "text", placeholderText: "Имя", name: "first_name", id: "first_name", alternative: "true"
        }),
        secondNameInput: input({
            type: "text", placeholderText: "Фамилия", name: "second_name", id: "second_name", alternative: "true"
        }),
        phoneInput: input({
            type: "text", placeholderText: "Телефон", name: "phone", id: "phone", alternative: "true"
        }),
        passwordInput: input({
            type: "password", placeholderText: "Пароль", name: "password", id: "password", alternative: "true"
        }),
        passwordConfirmInput: input({
            type: "password", placeholderText: "Пароль (еще раз)", name: "password_2", id: "password_2", alternative: "true"
        })
    };

    let html = compiled(data);

    return html;
};