import Handlebars from "handlebars";
import template from "./input.tmpl";
import { inputHandler } from "./modules/index"
import "./input.scss";

inputHandler();

const input = (props) => {
    let compiled = Handlebars.compile(template);

    let html = compiled({
        alternative: props.alternative,
        className: props.className,
        type: props.type ? props.type : "text",
        id: props.id,
        name: props.name,
        value: props.value,
        placeholderText: props.placeholderText,
        placeholderPosition: props.placeholderPosition,
        placeholderIcon: props.placeholderIcon
    });

    return html;
};

export default input