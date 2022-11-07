import Handlebars from "handlebars";
import template from "./header.tmpl";
import dropdown from "../ui/Dropdown";
import { icon_add, icon_delete, icon_dots } from "../ui/Icon";
import { dropdownHandler } from "../../modules/dropdown";
import { modalHandler } from "../../modules/modal";
import modal from "../Modal";
import input from "../ui/Input";
import button from "../ui/Button";
import "../ui/Avatar"
import "../ui/Button"
import "./header.scss";

const header = () => {
    const compiled = Handlebars.compile(template);

    const data = {
        dropdown: dropdown({
            btnClassName: "btn btn-circle",
            btnContent: icon_dots("icon-size-m"),
            menuList: [
                { dataToggle: "modal", dataTarget: "addUserModal", content: `${icon_add("icon-size-l icon-primary")} Добавить пользователя` },
                { content: `${icon_delete("icon-size-l icon-primary")} Удалить пользователя` }
            ]
        }),
        modal: modal({
            id: "addUserModal",
            title: "Добавить пользователя",
            content: `
                <div class="add-user-form">
                    ${input({
                        alternative: true,
                        id: "addUserLogin",
                        name: "addUserLogin",
                        placeholderText: "Логин",
                    })}
                    ${button({
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

export default header
