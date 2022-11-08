import Handlebars from "handlebars";
import template from "./chat.tmpl.js";
import ChatHeader from "../../components/ChatHeader";
import ChatFooter from "../../components/ChatFooter";
import ChatSidebar from "../../components/ChatSidebar";
import ChatList from "../../components/ChatList";
//import "../../components/ChatFooter";
//import "../../components/ui/Input";
//import "../../components/ui/Icon";
import { data as chats } from "../../data/data";
import "./styles.scss";

export default () => {
    const compiled = Handlebars.compile(template);

    const html = compiled({
        header: ChatHeader(),
        footer: ChatFooter(),
        sidebar: ChatSidebar(ChatList(chats))
    });

    return html;
};
