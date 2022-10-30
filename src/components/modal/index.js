import Handlebars from "handlebars";
import template from "./modal.tmpl";
import { icon_close } from "../ui/icon";
import "./modal.scss";

const modal = (props) => {
    let compiled = Handlebars.compile(template);

    let html = compiled({
        id: props.id,
        title: props.title ? props.title : "Title",
        icon_close: icon_close(),
        content: props.content,
        style: props.style
    });

    return html;
}

export default modal