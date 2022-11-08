import Handlebars from "handlebars";
import template from "./modal.tmpl";
import { IconClose } from "../ui/Icon";
import "./modal.scss";

const modal = (props) => {
    const compiled = Handlebars.compile(template);

    const html = compiled({
        id: props.id,
        title: props.title ? props.title : "Title",
        icon_close: IconClose(),
        content: props.content,
        style: props.style
    });

    return html;
}

export default modal
