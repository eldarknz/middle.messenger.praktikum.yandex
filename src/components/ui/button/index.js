import Handlebars from "handlebars";
import template from "./button.tmpl";
import "./button.scss";

Handlebars.registerPartial("button", template);

const button = (props) => {

    const compiled = Handlebars.compile(template);

    const html = compiled({
        className: props.className,
        id: props.id,
        content: props.content,
        href: props.id
    });

    return html;
};

export default button
