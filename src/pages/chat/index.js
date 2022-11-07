import Handlebars from "handlebars";
import template from "./chat.tmpl.js";
import header from "../../components/ChatHeader";
import footer from "../../components/ChatFooter";
import sidebar from "../../components/ChatSidebar";
import chatList from "../../components/ChatList";
import { data as chats } from "../../data/data";
import "../../components/ChatFooter";
import "../../components/ui/Input";
import "../../components/ui/Icon";
import "./styles.scss";

export default () => {
    const compiled = Handlebars.compile(template);

    const html = compiled({
        header: header(),
        footer: footer(),
        sidebar: sidebar(chatList(chats))
    });

    return html;
};
