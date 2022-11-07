import Handlebars from "handlebars";
import template from "./Input.tmpl";
import { inputHandler } from "./modules/index"
import "./Input.scss";

inputHandler();

const Input = (props) => {
    const compiled = Handlebars.compile(template);

    const html = compiled({
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

export default Input
