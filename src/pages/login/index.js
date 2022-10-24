import Handlebars from "handlebars";
import template from "./login.tmpl";
import "../../components/ui/button";
import "../../components/ui/input_search";
import "../../components/ui/label";
import "./styles.scss";

export default () => {
    let compiled = Handlebars.compile(template);

    let data = {
        title: "Вход"
    };

    let html = compiled(data);

    return html;
};