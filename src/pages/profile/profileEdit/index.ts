import Block from "../../../core/block";
import template from "./profileEdit.tmpl";
import Avatar from "../../../components/ui/avatar";
import Button from "../../../components/ui/button";
import Link from "../../../components/ui/link";
import Input from "../../../components/ui/input";
import { IconArrowLeft, IconMedia } from "../../../components/ui/icon";
import { TBlockAttributes } from "../../../../declarations";
import { validateInput } from "../../../utils/validation";
import "../styles.scss";

interface IProfileEdit {
    attr?: TBlockAttributes;
    buttonBack: Block;
    userAvatar: Block;
    emailInput: Block;
    loginInput: Block;
    firstNameInput: Block;
    secondNameInput: Block;
    chatNameInput: Block;
    phoneInput: Block;
    buttonSubmit: Block;
    events: { submit: (e: Event) => void };
}

class ProfileEdit extends Block {
    constructor(props: IProfileEdit) {
        super("div", props)
    }

    render() {
        return this.compile(template, {
            buttonBack: this.props.buttonBack,
            userAvatar: this.props.userAvatar,
            emailInput: this.props.emailInput,
            loginInput: this.props.loginInput,
            firstNameInput: this.props.firstNameInput,
            secondNameInput: this.props.secondNameInput,
            chatNameInput: this.props.chatNameInput,
            phoneInput: this.props.phoneInput,
            buttonSubmit: this.props.buttonSubmit,
            events: this.props.events
        })
    }
}

const ProfileEditPage = new ProfileEdit({
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
    emailInput: new Input({
        attr: {
            class: "form-group"
        },
        alternative: true,
        id: "email",
        name: "email",
        value: "pochta@yandex.ru",
        placeholderText: "Почта",
        events: {
            blur: (event) => validateInput(event.target as HTMLInputElement)
        }
    }),
    loginInput: new Input({
        attr: {
            class: "form-group"
        },
        alternative: true,
        id: "login",
        name: "login",
        value: "ivanivanov",
        placeholderText: "Логин",
        events: {
            blur: (event) => validateInput(event.target as HTMLInputElement)
        }
    }),
    firstNameInput: new Input({
        attr: {
            class: "form-group"
        },
        alternative: true,
        id: "first_name",
        name: "first_name",
        placeholderText: "Имя",
        value: "Иван",
        events: {
            blur: (event) => validateInput(event.target as HTMLInputElement)
        }
    }),
    secondNameInput: new Input({
        attr: {
            class: "form-group"
        },
        alternative: true,
        id: "second_name",
        name: "second_name",
        value: "Иванов",
        placeholderText: "Фамилия",
        events: {
            blur: (event) => validateInput(event.target as HTMLInputElement)
        }
    }),
    chatNameInput: new Input({
        attr: {
            class: "form-group"
        },
        alternative: true,
        id: "chat_name",
        name: "chat_name",
        value: "Иван",
        placeholderText: "Имя в чате",
        events: {
            blur: (event) => validateInput(event.target as HTMLInputElement)
        }
    }),
    phoneInput: new Input({
        attr: {
            class: "form-group"
        },
        alternative: true,
        id: "phone",
        name: "phone",
        value: "79099673030",
        placeholderText: "Телефон",
        events: {
            blur: (event) => validateInput(event.target as HTMLInputElement)
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
    }
})

export default ProfileEditPage
