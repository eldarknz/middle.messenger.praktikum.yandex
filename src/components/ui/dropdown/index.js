import Handlebars from "handlebars";
import template from "./dropdown.tmpl";
import "./dropdown.scss";

const dropdown = (btnClassName, btnContent, menuList) => {
    let compiled = Handlebars.compile(template);

    let html = compiled({btnClassName, btnContent, menuList});

    return html;
};

export default dropdown