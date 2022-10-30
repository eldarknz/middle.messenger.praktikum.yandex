import Handlebars from "handlebars";
import template from "./button.tmpl";
import "./button.scss";

Handlebars.registerPartial("button", template);

/*export default (className, id, content) => {
    return Handlebars.compile(template)({className, id, content});
}*/

const button = (props) => {

    let compiled = Handlebars.compile(template);

    let html = compiled({
        className: props.className,
        id: props.id,
        content: props.content,
        href: props.id
    });

    return html;
};

export default button