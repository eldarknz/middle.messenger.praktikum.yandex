import Block from "../../core/block";
import template from "./registration.tmpl";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import Link from "../../components/ui/Link";

interface IRegistration {
    attr?: any;
    title: string;
    emailInput: Block;
    loginInput: Block;
    firstNameInput: Block;
    secondNameInput: Block;
    phoneInput: Block;
    passwordInput: Block;
    passwordConfirmInput: Block;
    buttonSubmit: Block;
    link: Block;
}

class Registration extends Block {
    constructor(props: IRegistration) {
      super('div', props);
    }
  
    render() {
        return this.compile(template, {
            title: this.props.title,
            emailInput: this.props.emailInput,
            loginInput: this.props.loginInput,
            firstNameInput: this.props.firstNameInput,
            secondNameInput: this.props.secondNameInput,
            phoneInput: this.props.phoneInput,
            passwordInput: this.props.passwordInput,
            passwordConfirmInput: this.props.passwordConfirmInput,
            buttonSubmit: this.props.buttonSubmit,
            link: this.props.link
        });
    }
}

const RegistrationPage = new Registration({
    attr: {
        class: "container"
    },
    title: "Вход",
    emailInput: new Input({
        attr: {
            class: "form-group"
        },
        alternative: true,
        type: "text",
        id: "email",
        name: "email",
        placeholderText: "Почта"
    }),
    loginInput: new Input({
        attr: {
            class: "form-group"
        },
        alternative: true,
        type: "text",
        id: "login",
        name: "login",
        placeholderText: "Логин"
    }),
    firstNameInput: new Input({
        attr: {
            class: "form-group"
        },
        alternative: true,
        type: "text",
        id: "first_name",
        name: "first_name",
        placeholderText: "Имя"
    }),
    secondNameInput: new Input({
        attr: {
            class: "form-group"
        },
        alternative: true,
        type: "text",
        id: "second_name",
        name: "second_name",
        placeholderText: "Фамилия"
    }),
    phoneInput: new Input({
        attr: {
            class: "form-group"
        },
        alternative: true,
        type: "text",
        id: "phone",
        name: "phone",
        placeholderText: "Телефон"
    }),
    passwordInput: new Input({
        attr: {
            class: "form-group"
        },
        alternative: true,
        type: "password",
        id: "password",
        name: "password",
        placeholderText: "Пароль"
    }),
    passwordConfirmInput: new Input({
        attr: {
            class: "form-group"
        },
        alternative: true,
        type: "password",
        id: "password_2",
        name: "password_2",
        placeholderText: "Пароль (еще раз)"
    }),
    buttonSubmit: new Button({
        attr: {
            class: "btn btn-primary btn-block"
        },
        content: "Авторизоваться"
    }),
    link: new Link({
        attr: { href: "/login" },
        content: "Войдите в аккаунт"
    })
});
  
export default RegistrationPage

