import Block from "../../core/block";
import template from "./registration.tmpl";
import Button from "../../components/ui/button";
import Input from "../../components/ui/input";
import Link from "../../components/ui/link";
import { validateInput } from "../../utils/validation";
import { ROUTES } from "../../utils/constants";

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

//class Registration extends Block {
class RegistrationPage extends Block {
    constructor(props: IRegistration) {

        const logoLink = new Link({
            href: ROUTES.home.path
        });

        const title = "Вход";

        const emailInput = new Input({
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
        });

        const link = new Link({
            href: ROUTES.login.path,
            content: "Войдите в аккаунт",
            //events: {
            //    click: (event: MouseEvent) => routerGo(event, window.router, ROUTES.login.path)
            //}
        });

        const events = {
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
        }

        super({
            ...props,
            logoLink,
            title,
            emailInput,
            loginInput,
            firstNameInput,
            secondNameInput,
            phoneInput,
            passwordInput,
            passwordConfirmInput,
            buttonSubmit,
            link,
            events
        });
    }
  
    render() {
        return this.compile(template, this.props);
        /*return this.compile(template, {
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
        });*/
    }
}

/*const RegistrationPage = new Registration({
    title: "Вход",
    emailInput: new Input({
        alternative: true,
        id: "email",
        name: "email",
        placeholderText: "Почта",
        events: {
            blur: (event) => validateInput(event.target as HTMLInputElement)
        }
    }),
    loginInput: new Input({
        alternative: true,
        id: "login",
        name: "login",
        placeholderText: "Логин",
        events: {
            blur: (event) => validateInput(event.target as HTMLInputElement)
        }
    }),
    firstNameInput: new Input({
        alternative: true,
        id: "first_name",
        name: "first_name",
        placeholderText: "Имя",
        events: {
            blur: (event) => validateInput(event.target as HTMLInputElement)
        }
    }),
    secondNameInput: new Input({
        alternative: true,
        id: "second_name",
        name: "second_name",
        placeholderText: "Фамилия",
        events: {
            blur: (event) => validateInput(event.target as HTMLInputElement)
        }
    }),
    phoneInput: new Input({
        alternative: true,
        id: "phone",
        name: "phone",
        placeholderText: "Телефон",
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
    passwordConfirmInput: new Input({
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
    }),
    buttonSubmit: new Button({
        className: "btn btn-primary btn-block",
        content: "Авторизоваться"
    }),
    link: new Link({
        href: ROUTES.login.path,
        content: "Войдите в аккаунт",
        //events: {
        //    click: (event: MouseEvent) => routerGo(event, window.router, ROUTES.login.path)
        //}
    }),
    events: {
        submit: (event) => {
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
    }
});*/
  
export default RegistrationPage
