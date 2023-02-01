import Block from "../../../core/block";
import template from "./passwordEdit.tmpl";
import Avatar from "../../../components/ui/avatar";
import Button from "../../../components/ui/button";
import Input from "../../../components/ui/input";
import { IconArrowLeft, IconMedia } from "../../../components/ui/icon";
import { validateInput } from "../../../utils/validation";
import { ROUTES } from "../../../utils/constants";
import "../styles.scss";

interface IPasswordEdit {
    buttonBack: Block;
    userAvatar: Block;
    userName: string;
    oldPasswordInput: Block;
    newPasswordInput: Block;
    passwordConfirmInput: Block;
    buttonSubmit: Block;
    events: { submit: (e: Event) => void };
}

class PasswordEditPage extends Block {
    constructor(props: IPasswordEdit) {

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

        const newPasswordInput = new Input({
            alternative: true,
            type: "password",
            id: "new_password",
            name: "new_password",
            placeholderText: "Новый пароль",
            events: {
                blur: (event) => validateInput(event.target as HTMLInputElement)
            }
        });

        const oldPasswordInput = new Input({
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
                    if (current.name === 'new_password') {
                        if (!validateInput(current)) {
                            console.log('Пароль введен неверно');
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
        };

        super({ ...props, buttonBack, userAvatar, userName, newPasswordInput, oldPasswordInput, passwordConfirmInput, buttonSubmit, events })
    }

    render() {
        return this.compile(template, this.props)
    }
};

export default PasswordEditPage
