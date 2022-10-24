import Handlebars from "handlebars";
import template from "./sidebar.tmpl";
import "../../components/ui/icon/icons"
import "../../components/ui/input_search"
import "./sidebar.scss";

const sidebar = (content) => {
    let compiled = Handlebars.compile(template);

    let html = compiled({content});

    return html;
};

export default sidebar