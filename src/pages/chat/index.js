import Handlebars from "handlebars";
import template from "./chat.tmpl";
import header from "../../components/header";
import footer from "../../components/footer";
import sidebar from "../../components/sidebar";
import chatList from "../../components/chatList";
import { data as chats } from "../../data/data";
import "../../components/footer";
import "../../components/ui/input";
import "../../components/ui/icon";
import "./styles.scss";

export default () => {
    let compiled = Handlebars.compile(template);

    let data = {
        header: header(),
        footer: footer(),
        sidebar: sidebar(chatList(chats))
    }

    let html = compiled(data);

    return html;
};