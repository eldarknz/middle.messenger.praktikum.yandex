import Handlebars from "handlebars";
import template from "./Link.tmpl";

Handlebars.registerPartial("Link", template);

const Link = (props) => {
    const compiled = Handlebars.compile(template);

    const html = compiled({
        className: props.className,
        href: props.href,
        content: props.content
    })

    return html;
}

export default Link