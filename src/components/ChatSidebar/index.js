import Handlebars from "handlebars";
import template from "./ChatSidebar.tmpl";
import { Nav } from "../ui/Nav"
import Input from "../../components/ui/Input";
import {
    IconMessage,
    IconProfile,
    IconTalks,
    IconSettings,
    IconSearch
} from "../../components/ui/Icon";
import "./ChatSidebar.scss";

const ChatSidebar = (content) => {
    const compiled = Handlebars.compile(template);

    const html = compiled({
        content: content,
        nav: Nav(            [
            {link: "/profile", content: IconProfile("icon-size-l")},
            {link: "/", content: IconTalks("icon-size-l")},
            {link: "javascript:void(0);", content: IconSettings("icon-size-l")}
        ]),
        inputSearch: Input({
            id: "search",
            name: "search",
            placeholderText: "Поиск",
            placeholderPosition: "center",
            placeholderIcon: IconSearch()
        }),
        iconMessage: IconMessage("icon-size-m")
    });

    return html;
};

export default ChatSidebar
