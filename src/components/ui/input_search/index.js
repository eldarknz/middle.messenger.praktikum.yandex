import Handlebars from "handlebars";
import template from "./input.tmpl";
import "./input.scss";
import { inputHandler } from "./modules/index"
import "../icon/icons";

inputHandler();

const inputSearch = (props) => {

    let compiled = Handlebars.compile(template);

    let html = compiled({
        className: props.className,
        id: props.id,
        name: props.name,
        value: props.value,
        placeholderText: props.placeholderText,
        placeholderPosition: props.placeholderPosition,
        placeholderIcon: props.placeholderIcon
    });

    return html;
};

export default inputSearch