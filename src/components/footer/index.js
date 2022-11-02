import Handlebars from "handlebars";
import template from "./footer.tmpl";
import dropdown from "../ui/dropdown";
import { icon_attachment, icon_arrow_right, icon_media, icon_file, icon_location } from "../ui/icon";
import input from "../../components/ui/input";
import "../../components/ui/input"
import "../ui/button"
import "./footer.scss";

const footer = () => {
    const compiled = Handlebars.compile(template);

    const data = {
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
        inputMessage: input({
            id: "message",
            name: "message",
            placeholderText: "Сообщение",
        }),
        btnSendContent: icon_arrow_right("icon-white icon-size-m")
    }

    const html = compiled(data);

    return html;
};

export default footer
