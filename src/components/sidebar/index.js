import Handlebars from "handlebars";
import template from "./sidebar.tmpl";
import nav from "../ui/nav";
import "../../components/ui/icon/icons"
import "../../components/ui/input_search"
import "./sidebar.scss";
import { 
    icon_profile,
    icon_talks,
    icon_settings
} from "../../components/ui/icon/icons";

const sidebar = (content) => {
    let compiled = Handlebars.compile(template);

    let html = compiled({
        content: content,
        nav: nav(            [
            {link: "/profile", content: icon_profile("icon-size-l")},
            {link: "/", content: icon_talks("icon-size-l")},
            {link: "javascript:void(0);", content: icon_settings("icon-size-l")}
        ])
    });

    return html;
};

export default sidebar