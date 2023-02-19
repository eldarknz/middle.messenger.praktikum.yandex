import Block from "../../core/block";
import template from "./login.tmpl";
import Button from "../../components/ui/button";
import Input from "../../components/ui/input";
import Link from "../../components/ui/link";
import Logo from "../../components/ui/logo";
import Form from "../../components/ui/form";
import { validateInput } from "../../utils/validation";
import { ROUTES } from "../../utils/constants";
import { Container } from "../../components/ui/grid";
import { formSubmissionsHandler } from "../../utils/formHandler";
import AuthController from "../../core/controllers/authContorller";
import { inputValueHandler } from "../../utils/inputValueHandler";

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
                submit: formSubmissionsHandler(AuthController.signIn)
            }
        });

        const link = new Link({
            href: ROUTES.register.path,
            content: "Создайте её сейчас"
        });

        /*const events = {
            submit: (event: Event) => {
                event.preventDefault();
                const target = event.target as HTMLInputElement;
                const inputFields = target.querySelectorAll('input');
                const data: { [key: string]: string;} = {};
                inputFields.forEach((current) => {
                    if (current.name === 'login') {
                        if (!validateInput(current)) {
                            console.log('Логин введен неверно');
                        } else {
                            data[current.name] = current.value;
                        }
                    } else if (current.name === 'password') {
                        if (!validateInput(current)) {
                            console.log('Пароль введен неверно');
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
        };*/

        super({
            ...props,
            logoLink,
            title,
            form,
            link
        });
    }
  
    render() {
        return this.compile(template, this.props);
    }
};
  
export default LoginPage
