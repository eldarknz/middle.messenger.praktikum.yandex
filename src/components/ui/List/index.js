import Handlebars from "handlebars";
import template from "./List.tmpl";
import "./components/ListItem";
import "./List.scss";

const List = (props) => {
    const compiled = Handlebars.compile(template);

    const html = compiled({
        className: props.className,
        list: props.list
    })

    return html;
}

export default List