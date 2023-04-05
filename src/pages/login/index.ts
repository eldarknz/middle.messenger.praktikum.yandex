// Core
import Block from "@core/block";
import Router from "@core/router";
import AuthController from "@core/controllers/authContorller";
// Components
import Button from "@components/ui/button";
import { Container } from "@components/ui/grid";
import Form from "@components/ui/form";
import Input from "@components/ui/input";
import Link from "@components/ui/link";
import Logo from "@components/ui/logo";
// Utils
import { formDataSubmissionsHandler } from "@utils/formHandler";
import { validateInput } from "@utils/validation";
import { inputValueHandler } from "@utils/inputValueHandler";
import { ROUTES } from "@utils/constants";
// Template
import template from "./login.tmpl";

interface ILogin {
    title: string;
    loginInput: Block;
    passwordInput: Block;
    buttonSubmit: Block;
    link: Block;
    events: { submit: (e: Event) => void };
}

class LoginPage extends Block {
    constructor(props: ILogin) {

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
                            id: "login",
                            name: "login",
                            style: "flush",
                            placeholderText: "Логин",
                            events: {
                                blur: (event: Event) => validateInput(event.target as HTMLInputElement),
                                input: (event: Event) => inputValueHandler(event.target as HTMLInputElement)
                            }
                        }),
                        new Input({
                            type: "password",
                            id: "password",
                            name: "password",
                            style: "flush",
                            placeholderText: "Пароль",
                            events: {
                                blur: (event: Event) => validateInput(event.target as HTMLInputElement),
                                input: (event: Event) => inputValueHandler(event.target as HTMLInputElement)
                            }
                        })
                    ]
                }),
                new Button({
                    color: "primary",
                    size: "lg",
                    isFluid: true,
                    content: "Авторизоваться"
                })
            ],      
            events: {
                submit: (event: Event) => {
                    formDataSubmissionsHandler({
                        event: event,
                        handler: AuthController.signIn,
                        selector: ".sign-container__form__input-group",
                        isCheckInputs: true,
                        action: () => Router.getInstanse().go(ROUTES.chat.path)
                    });
                }
            }
        });

        const link = new Link({
            href: ROUTES.register.path,
            content: "Создайте её сейчас"
        });

        super({ ...props, logoLink, title, form, link });
    }
  
    render() {
        return this.compile(template, this.props);
    }
};
  
export default LoginPage
