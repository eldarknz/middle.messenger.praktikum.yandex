import Handlebars from "handlebars";
import {
    icon_add as icon_add_tmpl,
    icon_arrow_left as icon_arrow_left_tmpl,
    icon_arrow_right as icon_arrow_right_tmpl,
    icon_attachment as icon_attachment_tmpl,
    icon_close as icon_close_tmpl,
    icon_delete as icon_delete_tmpl,
    icon_done as icon_done_tmpl,
    icon_dots as icon_dots_tmpl,
    icon_file as icon_file_tmpl,
    icon_location as icon_location_tmpl,
    icon_media as icon_media_tmpl,
    icon_message as icon_message_tmpl,
    icon_profile as icon_profile_tmpl,
    icon_search as icon_search_tmpl,
    icon_settings as icon_settings_tmpl,
    icon_talks as icon_talks_tmpl
} from "./icons.tmpl";
import "./icon.scss";

Handlebars.registerPartial("icon_add", icon_add_tmpl);
Handlebars.registerPartial("icon_arrow_left", icon_arrow_left_tmpl);
Handlebars.registerPartial("icon_arrow_right", icon_arrow_right_tmpl);
Handlebars.registerPartial("icon_attachment", icon_attachment_tmpl);
Handlebars.registerPartial("icon_close", icon_close_tmpl);
Handlebars.registerPartial("icon_delete", icon_delete_tmpl);
Handlebars.registerPartial("icon_done", icon_done_tmpl);
Handlebars.registerPartial("icon_dots", icon_dots_tmpl);
Handlebars.registerPartial("icon_file", icon_file_tmpl);
Handlebars.registerPartial("icon_location", icon_location_tmpl);
Handlebars.registerPartial("icon_media", icon_media_tmpl);
Handlebars.registerPartial("icon_message", icon_message_tmpl);
Handlebars.registerPartial("icon_profile", icon_profile_tmpl);
Handlebars.registerPartial("icon_search", icon_search_tmpl);
Handlebars.registerPartial("icon_settings", icon_settings_tmpl);
Handlebars.registerPartial("icon_talks", icon_talks_tmpl);

const icon_add = (className) => Handlebars.compile(icon_add_tmpl)({className});
const icon_arrow_left = (className) => Handlebars.compile(icon_arrow_left_tmpl)({className});
const icon_arrow_right = (className) => Handlebars.compile(icon_arrow_right_tmpl)({className});
const icon_attachment = (className) => Handlebars.compile(icon_attachment_tmpl)({className});
const icon_close = (className) => Handlebars.compile(icon_close_tmpl)({className});
const icon_delete = (className) => Handlebars.compile(icon_delete_tmpl)({className});
const icon_done = (className) => Handlebars.compile(icon_done_tmpl)({className});
const icon_dots = (className) => Handlebars.compile(icon_dots_tmpl)({className});
const icon_file = (className) => Handlebars.compile(icon_file_tmpl)({className});
const icon_location = (className) => Handlebars.compile(icon_location_tmpl)({className});
const icon_media = (className) => Handlebars.compile(icon_media_tmpl)({className});
const icon_message = (className) => Handlebars.compile(icon_message_tmpl)({className});
const icon_profile = (className) => Handlebars.compile(icon_profile_tmpl)({className});
const icon_search = (className) => Handlebars.compile(icon_search_tmpl)({className});
const icon_settings = (className) => Handlebars.compile(icon_settings_tmpl)({className});
const icon_talks = (className) => Handlebars.compile(icon_talks_tmpl)({className});

export {
    icon_add,
    icon_arrow_left,
    icon_arrow_right,
    icon_attachment,
    icon_close,
    icon_delete,
    icon_done,
    icon_dots,
    icon_file,
    icon_location,
    icon_media,
    icon_message,
    icon_profile,
    icon_search,
    icon_settings,
    icon_talks
}
