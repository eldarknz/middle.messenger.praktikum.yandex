import Handlebars from "handlebars";
import template from "./chat.tmpl";
import "../../components/input_search"
import "../../components/icon";
import "../../components/icon/icons"
import "../../components/icon/helper"
import "./styles.scss";

import {
    icon_add,
    icon_arrow_left,
    icon_profile
} from "../../components/icon/icons/icons.tmpl"

export default () => {
    let compiled = Handlebars.compile(template);

    let data = {}

    let html = compiled(data);

    return html;
};