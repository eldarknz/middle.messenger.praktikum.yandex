import Handlebars from "handlebars";
import template from "./Dropdown.tmpl";
import Button from "../Button";
import "./Dropdown.scss";

const Dropdown = (props) => {

    const compiled = Handlebars.compile(template);

    const html = compiled({
        dropdownClassName: props.dropdownClassName,
        dropdownButton: Button({
            className: props.btnClassName,
            id: "dropdownMenuButton",
            content: props.btnContent
        }),
        menuList: props.menuList
    });

    return html;
};

export default Dropdown
