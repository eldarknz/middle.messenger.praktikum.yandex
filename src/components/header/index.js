import Handlebars from "handlebars";
import template from "./header.tmpl";
import dropdown from "../ui/dropdown";
import { icon_add, icon_delete, icon_dots } from "../ui/icon";
import { dropdownHandler } from "../../modules/dropdown";
import { modalHandler } from "../../modules/modal";
import modal from "../modal";
import input from "../ui/input";
import button from "../ui/button";
import "../ui/avatar"
import "../ui/button"
import "./header.scss";

const header = () => {
    let compiled = Handlebars.compile(template);

    let data = {
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

    let html = compiled(data);

    dropdownHandler();
    modalHandler();

    return html;
};

export default header