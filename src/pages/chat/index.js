import Handlebars from "handlebars";
import template from "./chat.tmpl.js";
import header from "../../components/header";
import footer from "../../components/footer";
import sidebar from "../../components/sidebar";
import chatList from "../../components/ChatList";
import { data as chats } from "../../data/data";
import "../../components/footer";
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
