import Handlebars from "handlebars";
import template from "./Button.tmpl";
import "./Button.scss";

Handlebars.registerPartial("Button", template);

const Button = (props) => {

    const compiled = Handlebars.compile(template);

    const html = compiled({
        className: props.className,
        id: props.id,
        content: props.content,
        href: props.href
    });

    return html;
};

export default Button
