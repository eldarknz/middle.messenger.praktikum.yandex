import Block from "../../core/block";
import template from "./login.tmpl";
import Button from "../../components/ui/button";
import Input from "../../components/ui/input";
import Link, { routerGo } from "../../components/ui/link";
import { validateInput } from "../../utils/validation";
import { ROUTES } from "../../utils/constants";

interface ILogin {
    title: string;
    loginInput: Block;
    passwordInput: Block;
    buttonSubmit: Block;
    link: Block;
    events: { submit: (e: Event) => void };
}

class Login extends Block {
    constructor(props: ILogin) {
      super(props);
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
    title: "Вход",
    loginInput: new Input({
        alternative: true,
        id: "login",
        name: "login",
        placeholderText: "Логин",
        events: {
            blur: (event) => validateInput(event.target as HTMLInputElement)
        }
    }),
    passwordInput: new Input({
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
        className: "btn btn-primary btn-block",
        content: "Авторизоваться"
    }),
    link: new Link({
        href: ROUTES.register.path,
        content: "Создайте её сейчас",
        //events: {
        //    click: (event: MouseEvent) => routerGo(event, window.router, ROUTES.register.path)
        //}
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
