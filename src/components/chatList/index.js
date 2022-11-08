import Handlebars from "handlebars";
import template from "./ChatList.tmpl";
import "./components/ChatCard";
import "./ChatList.scss";

const ChatList = (list) => {
    const compiled = Handlebars.compile(template);

    const html = compiled({list});

    return html;
};

export default ChatList
