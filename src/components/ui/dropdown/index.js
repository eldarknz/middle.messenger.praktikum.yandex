import Handlebars from "handlebars";
import template from "./dropdown.tmpl";
import "./dropdown.scss";

const dropdown = (props) => {

    let compiled = Handlebars.compile(template);

    let html = compiled({
        dropdownClassName: props.dropdownClassName,
        btnClassName: props.btnClassName,
        btnContent: props.btnContent,
        menuList: props.menuList
    });

    return html;
};

export default dropdown