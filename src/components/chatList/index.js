import Handlebars from "handlebars";
import template from "./chatList.tmpl";
import "./components/chatCard";
import "./chatList.scss";

const chatList = (list) => {
    const compiled = Handlebars.compile(template);

    const html = compiled({list});

    return html;
};

export default chatList
