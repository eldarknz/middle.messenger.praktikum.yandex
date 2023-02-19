import Block from "../../core/block";
import template from "./registration.tmpl";
import Button from "../../components/ui/button";
import Input from "../../components/ui/input";
import Link from "../../components/ui/link";
import Logo from "../../components/ui/logo";
import { validateInput } from "../../utils/validation";
import { ROUTES } from "../../utils/constants";
import Form from "../../components/ui/form";
import { Container } from "../../components/ui/grid";
import { formSubmissionsHandler } from "../../utils/formHandler";
import AuthController from "../../core/controllers/authContorller";
import { inputValueHandler } from "../../utils/inputValueHandler";
//import { clearForm } from "../../utils/clearForm";

interface IRegistration {
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

class RegistrationPage extends Block {
    constructor(props: IRegistration) {

        const logoLink = new Logo({
            style: "white",
            link: ROUTES.home.path
        });

        const title = "Вход";

        const form = new Form({
            className: "sign-container__form",
            content: [
                new Container({
                    isFluid: true,
                    className: "sign-container__form__input-group",
                    content: [
                        new Input({
                            id: "email",
                            name: "email",
                            style: "flush",
                            placeholderText: "Почта",
                            events: {
                                blur: (event) => validateInput(event.target as HTMLInputElement),
                                input: (event) => inputValueHandler(event.target as HTMLInputElement)
                            }
                        }),
                        new Input({
                            id: "login",
                            name: "login",
                            style: "flush",
                            placeholderText: "Логин",
                            events: {
                                blur: (event) => validateInput(event.target as HTMLInputElement),
                                input: (event) => inputValueHandler(event.target as HTMLInputElement)
                            }
                        }),
                        new Input({
                            id: "first_name",
                            name: "first_name",
                            style: "flush",
                            placeholderText: "Имя",
                            events: {
                                blur: (event) => validateInput(event.target as HTMLInputElement),
                                input: (event) => inputValueHandler(event.target as HTMLInputElement)
                            }
                        }),
                        new Input({
                            id: "second_name",
                            name: "second_name",
                            style: "flush",
                            placeholderText: "Фамилия",
                            events: {
                                blur: (event) => validateInput(event.target as HTMLInputElement),
                                input: (event) => inputValueHandler(event.target as HTMLInputElement)
                            }
                        }),
                        new Input({
                            id: "phone",
                            name: "phone",
                            style: "flush",
                            placeholderText: "Телефон",
                            events: {
                                blur: (event) => validateInput(event.target as HTMLInputElement),
                                input: (event) => inputValueHandler(event.target as HTMLInputElement)
                            }
                        }),
                        new Input({
                            type: "password",
                            id: "password",
                            name: "password",
                            style: "flush",
                            placeholderText: "Пароль",
                            events: {
                                blur: (event) => validateInput(event.target as HTMLInputElement),
                                input: (event) => inputValueHandler(event.target as HTMLInputElement)
                            }
                        }),
                        new Input({
                            type: "password",
                            id: "confirm_password",
                            name: "confirm_password",
                            style: "flush",
                            placeholderText: "Пароль (еще раз)",
                            events: {
                                blur: (event) => validateInput(event.target as HTMLInputElement),
                                input: (event) => inputValueHandler(event.target as HTMLInputElement)
                            }
                        })
                    ]
                }),
                new Button({
                    color: "primary",
                    size: "lg",
                    isFluid: true,
                    content: "Зарегистрироваться"
                })
            ],
            events: {
                submit: formSubmissionsHandler(AuthController.signUp)
                /*submit: (event: Event) => {
                    event.preventDefault();
                    const target = event.target as HTMLInputElement;
                    const inputFields = target.querySelectorAll('input');
                    const data: { [key: string]: string;} = {};
                    inputFields.forEach((current) => {
                        if (current.name === 'email') {
                            if (!validateInput(current)) {
                                console.log('Адрес электронной почты введен неверно');
                            } else {
                                data[current.name] = current.value;
                            }
                        } else if (current.name === 'login') {
                            if (!validateInput(current)) {
                                console.log('Логин введен неверно');
                            } else {
                                data[current.name] = current.value;
                            }
                        } else if (current.name === 'first_name') {
                            if (!validateInput(current)) {
                                console.log('Имя введено неверно');
                            } else {
                                data[current.name] = current.value;
                            }
                        } else if (current.name === 'second_name') {
                            if (!validateInput(current)) {
                                console.log('Фамилия введена неверно');
                            } else {
                                data[current.name] = current.value;
                            }
                        } else if (current.name === 'phone') {
                            if (!validateInput(current)) {
                                console.log('Телефон введен неверно');
                            } else {
                                data[current.name] = current.value;
                            }
                        } else if (current.name === 'password') {
                            if (!validateInput(current)) {
                                console.log('Пароль введен неверно');
                            } else {
                                data[current.name] = current.value;
                            }
                        } else if (current.name === 'password_2') {
                            if (!validateInput(current, document.querySelector("input[name=password]") as HTMLInputElement)) {
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
                },*/
            }
        })

        /*const emailInput = new Input({
            alternative: true,
            id: "email",
            name: "email",
            placeholderText: "Почта",
            events: {
                blur: (event) => validateInput(event.target as HTMLInputElement)
            }
        });

        const loginInput = new Input({
            alternative: true,
            id: "login",
            name: "login",
            placeholderText: "Логин",
            events: {
                blur: (event) => validateInput(event.target as HTMLInputElement)
            }
        });

        const firstNameInput = new Input({
            alternative: true,
            id: "first_name",
            name: "first_name",
            placeholderText: "Имя",
            events: {
                blur: (event) => validateInput(event.target as HTMLInputElement)
            }
        });

        const secondNameInput = new Input({
            alternative: true,
            id: "second_name",
            name: "second_name",
            placeholderText: "Фамилия",
            events: {
                blur: (event) => validateInput(event.target as HTMLInputElement)
            }
        });

        const phoneInput = new Input({
            alternative: true,
            id: "phone",
            name: "phone",
            placeholderText: "Телефон",
            events: {
                blur: (event) => validateInput(event.target as HTMLInputElement)
            }
        });

        const passwordInput = new Input({
            alternative: true,
            type: "password",
            id: "password",
            name: "password",
            placeholderText: "Пароль",
            events: {
                blur: (event) => validateInput(event.target as HTMLInputElement)
            }
        });

        const passwordConfirmInput = new Input({
            alternative: true,
            type: "password",
            id: "password_2",
            name: "password_2",
            placeholderText: "Пароль (еще раз)",
            events: {
                blur: (event) => {
                    validateInput(
                        event.target as HTMLInputElement,
                        document.querySelector("input[name=password]") as HTMLInputElement
                    );
                }
            }
        });

        const buttonSubmit = new Button({
            color: "primary",
            isRound: true,
            isFluid: true,
            content: "Зарегистрироваться"
        });*/

        const link = new Link({
            href: ROUTES.login.path,
            content: "Войдите в аккаунт"
        });

        /*const events = {
            submit: (event: Event) => {
                event.preventDefault();
                const target = event.target as HTMLInputElement;
                const inputFields = target.querySelectorAll('input');
                const data: { [key: string]: string;} = {};
                inputFields.forEach((current) => {
                    if (current.name === 'email') {
                        if (!validateInput(current)) {
                            console.log('Адрес электронной почты введен неверно');
                        } else {
                            data[current.name] = current.value;
                        }
                    } else if (current.name === 'login') {
                        if (!validateInput(current)) {
                            console.log('Логин введен неверно');
                        } else {
                            data[current.name] = current.value;
                        }
                    } else if (current.name === 'first_name') {
                        if (!validateInput(current)) {
                            console.log('Имя введено неверно');
                        } else {
                            data[current.name] = current.value;
                        }
                    } else if (current.name === 'second_name') {
                        if (!validateInput(current)) {
                            console.log('Фамилия введена неверно');
                        } else {
                            data[current.name] = current.value;
                        }
                    } else if (current.name === 'phone') {
                        if (!validateInput(current)) {
                            console.log('Телефон введен неверно');
                        } else {
                            data[current.name] = current.value;
                        }
                    } else if (current.name === 'password') {
                        if (!validateInput(current)) {
                            console.log('Пароль введен неверно');
                        } else {
                            data[current.name] = current.value;
                        }
                    } else if (current.name === 'password_2') {
                        if (!validateInput(current, document.querySelector("input[name=password]") as HTMLInputElement)) {
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
        }*/

        super({
            ...props,
            logoLink,
            title,
            form,
            /*emailInput,
            loginInput,
            firstNameInput,
            secondNameInput,
            phoneInput,
            passwordInput,
            passwordConfirmInput,
            buttonSubmit,*/
            link,
            //events
        });
    }
  
    render() {
        return this.compile(template, this.props);
    }
};
  
export default RegistrationPage
