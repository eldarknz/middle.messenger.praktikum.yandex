import Handlebars from "handlebars";
import {
    icon_add as icon_add_tpl,
    icon_arrow_left as icon_arrow_left_tpl,
    icon_arrow_right as icon_arrow_right_tpl,
    icon_attachment as icon_attachment_tpl,
    icon_delete as icon_delete_tpl,
    icon_done as icon_done_tpl,
    icon_dots as icon_dots_tpl,
    icon_file as icon_file_tpl,
    icon_location as icon_location_tpl,
    icon_media as icon_media_tpl,
    icon_profile as icon_profile_tpl,
    icon_search as icon_search_tpl
} from "./icons.tmpl";
import "./icon.scss";

Handlebars.registerPartial("icon_add", icon_add_tpl);
Handlebars.registerPartial("icon_arrow_left", icon_arrow_left_tpl);
Handlebars.registerPartial("icon_arrow_right", icon_arrow_right_tpl);
Handlebars.registerPartial("icon_attachment", icon_attachment_tpl);
Handlebars.registerPartial("icon_delete", icon_delete_tpl);
Handlebars.registerPartial("icon_done", icon_done_tpl);
Handlebars.registerPartial("icon_dots", icon_dots_tpl);
Handlebars.registerPartial("icon_file", icon_file_tpl);
Handlebars.registerPartial("icon_location", icon_location_tpl);
Handlebars.registerPartial("icon_media", icon_media_tpl);
Handlebars.registerPartial("icon_profile", icon_profile_tpl);
Handlebars.registerPartial("icon_search", icon_search_tpl);

const icon_add = (className) => {
    return Handlebars.compile(icon_add_tpl)({className});
}

const icon_delete = (className) => {
    return Handlebars.compile(icon_delete_tpl)({className});
}

const icon_dots = (className) => {
    return Handlebars.compile(icon_dots_tpl)({className});
}

export {
    icon_add,
    /*icon_arrow_left,
    icon_arrow_right,
    icon_attachment,*/
    icon_delete,
    /*icon_done,*/
    icon_dots,
    /*icon_file,
    icon_location,
    icon_media,
    icon_profile,
    icon_search*/
}