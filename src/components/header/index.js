import Handlebars from "handlebars";
import template from "./header.tmpl";
import dropdown from "../ui/dropdown";
import { icon_add, icon_delete, icon_dots } from "../ui/icon/icons";
import { dropdownHandler } from "../../modules/dropdown";
import "../ui/avatar"
import "../ui/button"
import "./header.scss";

//Handlebars.registerPartial("header", template);

//export default (className, content) => {
//    return Handlebars.compile(template)({className, content}));
//}

const header = () => {
    let compiled = Handlebars.compile(template);

    let data = {
        dropdown: dropdown(
            "btn btn-circle",
            icon_dots("icon-size-l"),
            [
                {link: "#", content: `${icon_add("icon-size-l icon-primary")} Добавить пользователя`},
                {link: "#", content: `${icon_delete("icon-size-l icon-primary")} Удалить пользователя`}
            ]
        )
    }

    let html = compiled(data);

    dropdownHandler();

    return html;
};

export default header