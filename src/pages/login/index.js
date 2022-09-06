import Handlebars from "handlebars";
import template from "./login.tmpl";
import "../../components/button";
import "../../components/input";
import "./styles.scss";

export default () => {
    let compiled = Handlebars.compile(template);

    let data = {
        title: "Вход",
        buttonText: "Авторизоваться",
    };

    let html = compiled(data);

    //let compiledFloatingContainer = Handlebars.compile('{{> floatingContainer }}');
    //let htmlContainer = compiledFloatingContainer({ floatingContainer: html })
    return html;
};