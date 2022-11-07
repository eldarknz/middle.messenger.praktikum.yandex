import Handlebars from "handlebars";
import template from "./sidebar.tmpl";
import { nav } from "../ui/Nav"
import input from "../../components/ui/Input";
import "../../components/ui/Icon"
import "./sidebar.scss";
import { 
    icon_profile,
    icon_talks,
    icon_settings,
    icon_search
} from "../../components/ui/Icon";

const sidebar = (content) => {
    const compiled = Handlebars.compile(template);

    const html = compiled({
        content: content,
        nav: nav(            [
            {link: "/profile", content: icon_profile("icon-size-l")},
            {link: "/", content: icon_talks("icon-size-l")},
            {link: "javascript:void(0);", content: icon_settings("icon-size-l")}
        ]),
        inputSearch: input({
            id: "search",
            name: "search",
            placeholderText: "Поиск",
            placeholderPosition: "center",
            placeholderIcon: icon_search()
        }),
    });

    return html;
};

export default sidebar
