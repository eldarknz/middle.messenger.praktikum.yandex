import Handlebars from "handlebars";
import template from "./chat.tmpl";
import header from "../../components/header";
import footer from "../../components/footer";
import sidebar from "../../components/sidebar";
import chatList from "../../components/chatList";
import "../../components/footer";
import "../../components/ui/input_search";
import "../../components/ui/icon/icons";
import "./styles.scss";

let chats = [
    { title: "Андрей", id: "0", messages: [] },
    { title: "Киноклуб", id: "1", messages: [] },
    { title: "Илья", id: "2", messages: [] },
    { title: "Вадим", id: "3", messages: [] },
    { title: "Тет-а-теты", id: "4", messages: [] },
    { title: "1, 2, 3", id: "5", messages: [] },
    { title: "Design destroyer", id: "6", messages: [] },
    { title: "Day.", id: "7", messages: [] },
    { title: "Стас Рогозин", id: "8", messages: [] },
    { title: "Жадранка", id: "9", messages: [] },
]

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