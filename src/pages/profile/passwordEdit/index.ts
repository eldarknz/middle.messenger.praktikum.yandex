import Block from "../../../core/block";
import template from "./passwordEdit.tmpl";
import Avatar from "../../../components/ui/avatar";
import Button from "../../../components/ui/button";
import Link from "../../../components/ui/link";
import Input from "../../../components/ui/input";
import { IconArrowLeft, IconMedia } from "../../../components/ui/icon";
import { TBlockAttributes } from "../../../../declarations";
import { validateInput } from "../../../utils/validation";
import "../styles.scss";

interface IPasswordEdit {
    attr?: TBlockAttributes;
    buttonBack: Block;
    userAvatar: Block;
    oldPasswordInput: Block;
    newPasswordInput: Block;
    passwordConfirmInput: Block;
    buttonSubmit: Block;
    events: { submit: (e: Event) => void };
}

class PasswordEdit extends Block {
    constructor(props: IPasswordEdit) {
        super("div", props)
    }

    render() {
        return this.compile(template, {
            buttonBack: this.props.buttonBack,
            oldPasswordInput: this.props.oldPasswordInput,
            newPasswordInput: this.props.newPasswordInput,
            passwordConfirmInput: this.props.passwordConfirmInput,
            buttonSubmit: this.props.buttonSubmit,
            events: this.props.events
        })
    }
}

const PasswordEditPage = new PasswordEdit({
    attr: {
        class: "wrapper"
    },
    buttonBack: new Link({
        attr: {
            href: "/profile"
        },
        content: new Button({
            attr: {
                class: "btn btn-circle btn-primary"
            },
            content: new IconArrowLeft({ attr: { class: "icon icon-white" }})
        })
    }),
    userAvatar: new Avatar({
        attr: {
            class: "avatar avatar_size_l"
        },
        content: new IconMedia({ attr: { class:"icon icon-white icon-size-xxl"}})
    }),
    newPasswordInput: new Input({
        attr: {
            class: "form-group"
        },
        alternative: true,
        type: "password",
        id: "new_password",
        name: "new_password",
        placeholderText: "Новый пароль",
        events: {
            blur: (event) => validateInput(event.target as HTMLInputElement)
        }
    }),
    oldPasswordInput: new Input({
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
    passwordConfirmInput: new Input({
        attr: {
            class: "form-group"
        },
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
        attr: {
            class: "btn btn-primary btn-block"
        },
        content: "Сохранить изменения"
    }),
    events: {
        submit: (event) => {
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
    }
})

export default PasswordEditPage
