// Core
import { Block } from "@core/block";
import { Router } from "@core/router";
import { AuthController } from "@core/controllers/authContorller";
// Components
import { Button } from "@components/ui/button";
import { Container } from "@components/ui/grid";
import { Form } from "@components/ui/form";
import { Input } from "@components/ui/input";
import { Link } from "@components/ui/link";
import { Logo } from "@components/ui/logo";
// Utils
import { formDataSubmissionsHandler } from "@utils/formHandler";
import { validateInput } from "@utils/validation";
import { inputValueHandler } from "@utils/inputValueHandler";
import { ROUTES } from "@utils/constants";
// Template
import template from "./registration.tmpl";

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

export class RegistrationPage extends Block {
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
                submit: (event: Event) => {
                    formDataSubmissionsHandler({
                        event: event,
                        handler: AuthController.signUp,
                        selector: ".sign-container__form__input-group",
                        isCheckInputs: true,
                        action: () => Router.getInstanse().go(ROUTES.chat.path)
                    });
                }
            }
        })

        const link = new Link({
            href: ROUTES.login.path,
            content: "Войдите в аккаунт"
        });

        super({ ...props, logoLink, title, form, link });
    }
  
    render() {
        return this.compile(template, this.props);
    }
}
