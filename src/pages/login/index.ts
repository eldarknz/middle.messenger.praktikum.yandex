import Block from "../../core/block";
import template from "./login.tmpl";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import Link from "../../components/ui/Link";
import { validateInput } from "../../utils/validation";
import { TBlockAttributes } from "../../../declarations";

interface ILogin {
    attr?: TBlockAttributes;
    title: string;
    loginInput: Block;
    passwordInput: Block;
    buttonSubmit: Block;
    link: Block;
    events: { submit: (e: Event) => void };
}

class Login extends Block {
    constructor(props: ILogin) {
      super('div', props);
    }
  
    render() {
        return this.compile(template, {
            title: this.props.title,
            loginInput: this.props.loginInput,
            passwordInput: this.props.passwordInput,
            buttonSubmit: this.props.buttonSubmit,
            link: this.props.link,
            events: this.props.events
        });
    }
}

const LoginPage = new Login({
    attr: {
        class: "container"
    },
    title: "Вход",
    loginInput: new Input({
        attr: {
            class: "form-group"
        },
        alternative: true,
        id: "login",
        name: "login",
        placeholderText: "Логин",
        events: {
            blur: (event) => validateInput(event.target as HTMLInputElement)
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
            blur: (event) => validateInput(event.target as HTMLInputElement)
        }
    }),
    buttonSubmit: new Button({
        attr: {
            class: "btn btn-primary btn-block"
        },
        content: "Авторизоваться"
    }),
    link: new Link({
        attr: { href: "/register" },
        content: "Создайте её сейчас"
    }),
    events: {
        submit: (event) => {
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
    },
});
  
export default LoginPage
