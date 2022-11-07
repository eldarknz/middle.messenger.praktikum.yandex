import Handlebars from "handlebars";
import template from "./ChatHeader.tmpl";
import Dropdown from "../ui/Dropdown";
import { IconAdd, IconDelete, IconDots } from "../ui/Icon";
import Modal from "../Modal";
import Input from "../ui/Input";
import Button from "../ui/Button";
import Avatar from "../ui/Avatar";
import "./ChatHeader.scss";
import { dropdownHandler, modalHandler } from "../../modules";

const ChatHeader = () => {
    const compiled = Handlebars.compile(template);

    const data = {
        avatar: Avatar(),
        dropdown: Dropdown({
            btnClassName: "btn btn-circle",
            btnContent: IconDots("icon-size-m"),
            menuList: [
                { dataToggle: "modal", dataTarget: "addUserModal", content: `${IconAdd("icon-size-l icon-primary")} Добавить пользователя` },
                { content: `${IconDelete("icon-size-l icon-primary")} Удалить пользователя` }
            ]
        }),
        modal: Modal({
            id: "addUserModal",
            title: "Добавить пользователя",
            content: `
                <div class="add-user-form">
                    ${Input({
                        alternative: true,
                        id: "addUserLogin",
                        name: "addUserLogin",
                        placeholderText: "Логин",
                    })}
                    ${Button({
                        className: "btn btn-block btn-primary",
                        content: "Добавить"
                    })}
                </div>
            `,
            style: "display: none"
        })
    }

    const html = compiled(data);

    dropdownHandler();
    modalHandler();

    return html;
};

export default ChatHeader
