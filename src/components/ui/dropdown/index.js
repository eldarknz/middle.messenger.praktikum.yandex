import Handlebars from "handlebars";
import template from "./dropdown.tmpl";
import "./dropdown.scss";

const dropdown = (props) => {

    const compiled = Handlebars.compile(template);

    const html = compiled({
        dropdownClassName: props.dropdownClassName,
        btnClassName: props.btnClassName,
        btnContent: props.btnContent,
        menuList: props.menuList
    });

    return html;
};

export default dropdown
