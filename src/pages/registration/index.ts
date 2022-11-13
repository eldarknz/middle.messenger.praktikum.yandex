import Block from "../../core/block";
import template from "./registration.tmpl";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import Link from "../../components/ui/Link";
import ValidationForm from "../../utils/validation";
import { TBlockAttributes } from "../../../declarations";

const validation = new ValidationForm();

interface IRegistration {
    attr?: TBlockAttributes;
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
    events: { submit: (e: Event) => void };
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
            link: this.props.link,
            events: this.props.events
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
        id: "email",
        name: "email",
        placeholderText: "Почта",
        events: {
            blur: (event) => {
                const target = event.target as HTMLInputElement;
                if (target.name === 'email') {
                    if (!validation.checkEmail(target.value)) {
                        validation.showError(target, '.form-group');
                    } else {
                        validation.hideError(target, '.form-group');
                    }
                }
            }
        }
    }),
    loginInput: new Input({
        attr: {
            class: "form-group"
        },
        alternative: true,
        id: "login",
        name: "login",
        placeholderText: "Логин",
        events: {
            blur: (event) => {
                const target = event.target as HTMLInputElement;
                if (target.name === 'login') {
                    if (!validation.checkLogin(target.value)) {
                        validation.showError(target, '.form-group');
                    } else {
                        validation.hideError(target, '.form-group');
                    }
                }
            }
        }
    }),
    firstNameInput: new Input({
        attr: {
            class: "form-group"
        },
        alternative: true,
        id: "first_name",
        name: "first_name",
        placeholderText: "Имя",
        events: {
            blur: (event) => {
                const target = event.target as HTMLInputElement;
                if (target.name === 'first_name') {
                    if (!validation.checkName(target.value)) {
                        validation.showError(target, '.form-group', "Неверный формат, либо имя с маленькой буквы");
                    } else {
                        validation.hideError(target, '.form-group');
                    }
                }
            }
        }
    }),
    secondNameInput: new Input({
        attr: {
            class: "form-group"
        },
        alternative: true,
        id: "second_name",
        name: "second_name",
        placeholderText: "Фамилия",
        events: {
            blur: (event) => {
                const target = event.target as HTMLInputElement;
                if (target.name === 'second_name') {
                    if (!validation.checkName(target.value)) {
                        validation.showError(target, '.form-group', "Неверный формат, либо фамилия с маленькой буквы");
                    } else {
                        validation.hideError(target, '.form-group');
                    }
                }
            }
        }
    }),
    phoneInput: new Input({
        attr: {
            class: "form-group"
        },
        alternative: true,
        id: "phone",
        name: "phone",
        placeholderText: "Телефон",
        events: {
            blur: (event) => {
                const target = event.target as HTMLInputElement;
                if (target.name === 'phone') {
                    if (!validation.checkPhone(target.value)) {
                        validation.showError(target, '.form-group');
                    } else {
                        validation.hideError(target, '.form-group');
                    }
                }
            }
        }
    }),
    passwordInput: new Input({
        attr: {
            class: "form-group"
        },
        alternative: true,
        type: "password",
        id: "password",
        name: "password",
        placeholderText: "Пароль",
        events: {
            blur: (event) => {
                const target = event.target as HTMLInputElement;
                if (target.name === 'password') {
                    if (!validation.checkPassword(target.value)) {
                        validation.showError(target, '.form-group', "Неверный формат, либо менее 8 символов");
                    } else {
                        validation.hideError(target, '.form-group');
                    }
                }
            }
        }
    }),
    passwordConfirmInput: new Input({
        attr: {
            class: "form-group"
        },
        alternative: true,
        type: "password",
        id: "password_2",
        name: "password_2",
        placeholderText: "Пароль (еще раз)",
        events: {
            blur: (event) => {
                const target = event.target as HTMLInputElement;
                const password = document.querySelector("input[name=password]") as HTMLInputElement;
                if (target.name === 'password_2') {
                    if (!validation.checkPassword(target.value) || !validation.checkPasswordConfirm(target.value, password.value)) {
                        validation.showError(target, '.form-group', "Неверный формат, либо пароли не совпадают");
                    } else {
                        validation.hideError(target, '.form-group');
                    }
                }
            }
        }
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
    }),
    events: {
        submit: (event) => {
            event.preventDefault();
            const target = event.target as HTMLInputElement;
            const inputFields = target.querySelectorAll('input');
            const data: { [key: string]: string;} = {};
            inputFields.forEach((current) => {
                if (current.name === 'email') {
                    if (!validation.checkEmail(current.value)) {
                        validation.showError(current, '.form-group');
                        console.log('Адрес электронной почты введен неверно');
                    } else {
                        data[current.name] = current.value;
                    }
                } else if (current.name === 'login') {
                    if (!validation.checkLogin(current.value)) {
                        validation.showError(current, '.form-group');
                        console.log('Логин введен неверно');
                    } else {
                        data[current.name] = current.value;
                    }
                } else if (current.name === 'first_name') {
                    if (!validation.checkName(current.value)) {
                        validation.showError(current, '.form-group');
                        console.log('Имя введено неверно');
                    } else {
                        data[current.name] = current.value;
                    }
                } else if (current.name === 'second_name') {
                    if (!validation.checkName(current.value)) {
                        validation.showError(current, '.form-group');
                        console.log('Фамилия введена неверно');
                    } else {
                        data[current.name] = current.value;
                    }
                } else if (current.name === 'phone') {
                    if (!validation.checkPhone(current.value)) {
                        validation.showError(current, '.form-group');
                        console.log('Телефон введен неверно');
                    } else {
                        data[current.name] = current.value;
                    }
                } else if (current.name === 'password') {
                    if (!validation.checkPassword(current.value)) {
                        validation.showError(current, '.form-group');
                        console.log('Пароль введен неверно');
                    } else {
                        data[current.name] = current.value;
                    }
                } else if (current.name === 'password_2') {
                    const password = document.querySelector("input[name=password]") as HTMLInputElement;
                    if (!validation.checkPassword(current.value)) {
                        validation.showError(current, '.form-group');
                        console.log('Пароль введен неверно');
                    } else if (!validation.checkPasswordConfirm(current.value, password.value)) {
                        validation.showError(current, '.form-group');
                        console.log('Пароль и подтверждение пароля не совпадают');
                    } else {
                        data[current.name] = current.value;
                    }
                } else {
                    console.log('current', current);
                    data[current.name] = current.value;
                }
            });
            console.log('data', data);
        },
    }
});
  
export default RegistrationPage

