import Handlebars from "handlebars";
import template from "./chatList.tmpl";
import "./components/chatCard";
import "./chatList.scss";

const chatList = (list) => {
    let compiled = Handlebars.compile(template);

    let html = compiled({list});

    return html;
};

export default chatList