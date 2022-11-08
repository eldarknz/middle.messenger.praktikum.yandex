import Handlebars from "handlebars";
import template from "./registration.tmpl";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";

export default () => {
    const compiled = Handlebars.compile(template);

    const html = compiled({
        title: "Регистрация",
        emailInput: Input({
            type: "email", placeholderText: "Почта", name: "email", id: "email", alternative: "true"
        }),
        loginInput: Input({
            type: "text", placeholderText: "Логин", name: "login", id: "login", alternative: "true"
        }),
        firstNameInput: Input({
            type: "text", placeholderText: "Имя", name: "first_name", id: "first_name", alternative: "true"
        }),
        secondNameInput: Input({
            type: "text", placeholderText: "Фамилия", name: "second_name", id: "second_name", alternative: "true"
        }),
        phoneInput: Input({
            type: "text", placeholderText: "Телефон", name: "phone", id: "phone", alternative: "true"
        }),
        passwordInput: Input({
            type: "password", placeholderText: "Пароль", name: "password", id: "password", alternative: "true"
        }),
        passwordConfirmInput: Input({
            type: "password", placeholderText: "Пароль (еще раз)", name: "password_2", id: "password_2", alternative: "true"
        }),
        buttonSubmit: Button({
            className: "btn btn-primary btn-block",
            content: "Зарегистрироваться"
        })
    });

    return html;
};
