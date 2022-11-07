import Handlebars from "handlebars";
import template from "./Avatar.tmlp";
import "./Avatar.scss";

Handlebars.registerPartial("avatar", template);

const Avatar = (props = {}) => {

    const compiled = Handlebars.compile(template);

    const html = compiled({
        className: props.className,
        content: props.content
    });

    return html;
};

export default Avatar