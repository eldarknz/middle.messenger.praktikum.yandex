import Handlebars from "handlebars";
import template from "./profile.tmpl";
import button from "../../components/ui/button";
import { icon_arrow_left, icon_media } from "../../components/ui/icon";
import { userData } from "../../data/userdata";
import "./styles.scss";

export default () => {
    let compiled = Handlebars.compile(template);

    let html = compiled({
        userAvatarIcon: icon_media("icon-white icon-size-xxl"),
        userName: "Иван",
        btnBackContent: icon_arrow_left("icon-white"),
        userDataList: userData
    });

    return html;
};