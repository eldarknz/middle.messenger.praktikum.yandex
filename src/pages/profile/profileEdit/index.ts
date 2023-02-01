import Block from "../../../core/block";
import template from "./profileEdit.tmpl";
import Avatar from "../../../components/ui/avatar";
import Button from "../../../components/ui/button";
import Input from "../../../components/ui/input";
import { IconArrowLeft, IconMedia } from "../../../components/ui/icon";
import { validateInput } from "../../../utils/validation";
import { ROUTES } from "../../../utils/constants";
import "../styles.scss";

interface IProfileEdit {
    buttonBack: Block;
    userAvatar: Block;
    userName: string;
    emailInput: Block;
    loginInput: Block;
    firstNameInput: Block;
    secondNameInput: Block;
    chatNameInput: Block;
    phoneInput: Block;
    buttonSubmit: Block;
    events: { submit: (e: Event) => void };
}

class ProfileEditPage extends Block {
    constructor(props: IProfileEdit) {

        const buttonBack = new Button({
            color: "primary",
            isCircle: true,
            content: new IconArrowLeft({}),
            events: {
                click: () => { window.router.go(ROUTES.profile.path); }
            }
        });

        const userAvatar = new Avatar({
            size: "lg",
            content: new IconMedia({
                color: "white",
                size: "xxl"
            })
        });

        const userName = "Иван";

        const emailInput = new Input({
            alternative: true,
            id: "email",
            name: "email",
            value: "pochta@yandex.ru",
            placeholderText: "Почта",
            events: {
                blur: (event) => validateInput(event.target as HTMLInputElement)
            }
        });

        const loginInput = new Input({
            alternative: true,
            id: "login",
            name: "login",
            value: "ivanivanov",
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
            value: "Иван",
            events: {
                blur: (event) => validateInput(event.target as HTMLInputElement)
            }
        });

        const secondNameInput = new Input({
            alternative: true,
            id: "second_name",
            name: "second_name",
            value: "Иванов",
            placeholderText: "Фамилия",
            events: {
                blur: (event) => validateInput(event.target as HTMLInputElement)
            }
        });

        const chatNameInput = new Input({
            alternative: true,
            id: "chat_name",
            name: "chat_name",
            value: "Иван",
            placeholderText: "Имя в чате",
            events: {
                blur: (event) => validateInput(event.target as HTMLInputElement)
            }
        });

        const phoneInput = new Input({
            alternative: true,
            id: "phone",
            name: "phone",
            value: "79099673030",
            placeholderText: "Телефон",
            events: {
                blur: (event) => validateInput(event.target as HTMLInputElement)
            }
        });

        const buttonSubmit = new Button({
            color: "primary",
            isFluid: true,
            isRound: true,
            content: "Сохранить изменения"
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
                    } else if (current.name === 'chat_name') {
                        if (!validateInput(current)) {
                            console.log('Имя введено неверно');
                        } else {
                            data[current.name] = current.value;
                        }
                    } else if (current.name === 'phone') {
                        if (!validateInput(current)) {
                            console.log('Телефон введен неверно');
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
        };

        super({ ...props, buttonBack, userAvatar, userName, emailInput, loginInput, firstNameInput, secondNameInput, chatNameInput, phoneInput, buttonSubmit, events });
    }

    render() {
        return this.compile(template, this.props);
    }
};

export default ProfileEditPage
