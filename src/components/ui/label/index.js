import Handlebars from "handlebars";
import template from "./Label.tmpl";
import "./Label.scss";

Handlebars.registerPartial("label", template);

const Label = (props) => {

    const compiled = Handlebars.compile(template);

    const html = compiled({
        className: props.className,
        content: props.content
    });

    return html;
};

export default Label
