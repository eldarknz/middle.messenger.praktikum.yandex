import Handlebars from "handlebars";
import template from "./modal.tmpl";
import { icon_close } from "../ui/icon/icons";
import "./modal.scss";

const modal = (props) => {
    let compiled = Handlebars.compile(template);

    let html = compiled({
        id: props.id,
        title: "Добавить пользователя",
        icon_close: icon_close(),
        content: "Контент"
    });

    return html;
}

export default modal