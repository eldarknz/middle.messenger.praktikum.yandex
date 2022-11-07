import Handlebars from "handlebars";
import template from "./ChatFooter.tmpl";
import Dropdown from "../ui/Dropdown";
import { IconAttachment, IconArrowRight, IconMedia, IconFile, IconLocation } from "../ui/Icon";
import Input from "../../components/ui/Input";
import Button from "../ui/Button";
import "./ChatFooter.scss";

const ChatFooter = () => {
    const compiled = Handlebars.compile(template);

    const data = {
        dropdown: Dropdown({
            dropdownClassName: "up",
            btnClassName: "btn btn-square btn-gray",
            btnContent: IconAttachment("icon-size-m"),
            menuList: [
                {link: "#", content: `${IconMedia("icon-size-l icon-primary")} Фото или видео`},
                {link: "#", content: `${IconFile("icon-size-l icon-primary")} Файл`},
                {link: "#", content: `${IconLocation("icon-size-l icon-primary")} Локация`}
            ]
        }),
        inputMessage: Input({
            id: "message",
            name: "message",
            placeholderText: "Сообщение",
        }),
        btnSend: Button({
            className:"btn btn-square btn-primary",
            content: IconArrowRight("icon-white icon-size-m")
        })
    }

    const html = compiled(data);

    return html;
};

export default ChatFooter
