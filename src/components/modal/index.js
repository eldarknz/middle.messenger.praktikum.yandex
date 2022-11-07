import Handlebars from "handlebars";
import template from "./modal.tmpl";
import { icon_close } from "../ui/Icon";
import "./modal.scss";

const modal = (props) => {
    const compiled = Handlebars.compile(template);

    const html = compiled({
        id: props.id,
        title: props.title ? props.title : "Title",
        icon_close: icon_close(),
        content: props.content,
        style: props.style
    });

    return html;
}

export default modal
