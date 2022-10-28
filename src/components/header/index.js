import Handlebars from "handlebars";
import template from "./header.tmpl";
import dropdown from "../ui/dropdown";
import { icon_add, icon_delete, icon_dots } from "../ui/icon/icons";
import { dropdownHandler } from "../../modules/dropdown";
import modal from "../modal";
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
                { dataToggle: "modal", dataTarget: "addUserModal", onClick: "alert('Hello!')", content: `${icon_add("icon-size-l icon-primary")} Добавить пользователя`},
                {content: `${icon_delete("icon-size-l icon-primary")} Удалить пользователя`}
            ]
        }),
        modal: modal({
            id: "addUserModal"
        })
    }

    let html = compiled(data);

    dropdownHandler();

    return html;
};

export default header