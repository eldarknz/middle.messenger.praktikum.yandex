import Handlebars from "handlebars";
import template from "./footer.tmpl";
import dropdown from "../ui/dropdown";
import { icon_attachment, icon_arrow_right, icon_media, icon_file, icon_location } from "../ui/icon/icons";
import inputSearch from "../../components/ui/input_search";
import "../../components/ui/input_search"
import "../ui/button"
import "./footer.scss";

const footer = () => {
    let compiled = Handlebars.compile(template);

    let data = {
        dropdown: dropdown({
            dropdownClassName: "up",
            btnClassName: "btn btn-square btn-gray",
            btnContent: icon_attachment("icon-size-m"),
            menuList: [
                {link: "#", content: `${icon_media("icon-size-l icon-primary")} Фото или видео`},
                {link: "#", content: `${icon_file("icon-size-l icon-primary")} Файл`},
                {link: "#", content: `${icon_location("icon-size-l icon-primary")} Локация`}
            ]
        }),
        inputMessage: inputSearch({
            id: "message",
            name: "message",
            placeholderText: "Сообщение",
        }),
        btnSend: icon_arrow_right("icon-white icon-size-m")
    }

    let html = compiled(data);

    return html;
};

export default footer