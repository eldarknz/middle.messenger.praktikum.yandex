import Block from "../../core/block";
import template from "./login.tmpl";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import Link from "../../components/ui/Link";
import ValidationForm from "../../utils/validation";

const validation = new ValidationForm();

interface ILogin {
    attr?: any;
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
                        validation.showError(target, '.form-group');
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
        attr: { href: "/register" },
        content: "Создайте её сейчас"
    }),
    events: {
        submit: (event) => {
            event.preventDefault();
            const target = event.target as HTMLInputElement;
            const inputFields = target.querySelectorAll('input');
            const data = {};
            inputFields.forEach((current) => {
                if (current.name === 'login') {
                    if (!validation.checkLogin(current.value)) {
                        validation.showError(current, '.form-group');
                        console.log('Логин введен неверно');
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
