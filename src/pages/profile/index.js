import Handlebars from "handlebars";
import template from "./profile.tmpl";
import { IconArrowLeft, IconMedia } from "../../components/ui/Icon";
import { userData } from "../../data/userdata";
import "./styles.scss";

export default () => {
    const compiled = Handlebars.compile(template);

    const html = compiled({
        userAvatarIcon: IconMedia("icon-white icon-size-xxl"),
        userName: "Иван",
        btnBackContent: IconArrowLeft("icon-white"),
        userDataList: userData
    });

    return html;
};
