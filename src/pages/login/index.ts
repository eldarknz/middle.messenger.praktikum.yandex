import Block from "../../core/block";
import template from "./login.tmpl";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import Link from "../../components/ui/Link";

interface ILogin {
    attr?: any;
    title: string;
    loginInput: Block;
    passwordInput: Block;
    buttonSubmit: Block;
    link: Block;
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
            link: this.props.link
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
        placeholderText: "Логин"
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
    buttonSubmit: new Button({
        attr: {
            class: "btn btn-primary btn-block"
        },
        content: "Авторизоваться"
    }),
    link: new Link({
        attr: { href: "/register" },
        content: "Создайте её сейчас"
    })
});
  
export default LoginPage
