import Handlebars from "handlebars";
import template from "./Dropdown.tmpl";
import "./Dropdown.scss";

const Dropdown = (props) => {

    const compiled = Handlebars.compile(template);

    const html = compiled({
        dropdownClassName: props.dropdownClassName,
        btnClassName: props.btnClassName,
        btnContent: props.btnContent,
        menuList: props.menuList
    });

    return html;
};

export default Dropdown
