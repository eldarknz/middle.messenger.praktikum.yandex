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
} from "./Icons.tmpl";
import "./Icon.scss";

Handlebars.registerPartial("IconAdd", icon_add_tmpl);
Handlebars.registerPartial("IconArrowLeft", icon_arrow_left_tmpl);
Handlebars.registerPartial("IconArrowRight", icon_arrow_right_tmpl);
Handlebars.registerPartial("IconAttachment", icon_attachment_tmpl);
Handlebars.registerPartial("IconClose", icon_close_tmpl);
Handlebars.registerPartial("IconDelete", icon_delete_tmpl);
Handlebars.registerPartial("IconDone", icon_done_tmpl);
Handlebars.registerPartial("IconDots", icon_dots_tmpl);
Handlebars.registerPartial("IconFile", icon_file_tmpl);
Handlebars.registerPartial("IconLocation", icon_location_tmpl);
Handlebars.registerPartial("IconMedia", icon_media_tmpl);
Handlebars.registerPartial("IconMessage", icon_message_tmpl);
Handlebars.registerPartial("IconProfile", icon_profile_tmpl);
Handlebars.registerPartial("IconSearch", icon_search_tmpl);
Handlebars.registerPartial("IconSettings", icon_settings_tmpl);
Handlebars.registerPartial("IconTalks", icon_talks_tmpl);

const IconAdd = (className) => Handlebars.compile(icon_add_tmpl)({className});
const IconArrowLeft = (className) => Handlebars.compile(icon_arrow_left_tmpl)({className});
const IconArrowRight = (className) => Handlebars.compile(icon_arrow_right_tmpl)({className});
const IconAttachment = (className) => Handlebars.compile(icon_attachment_tmpl)({className});
const IconClose = (className) => Handlebars.compile(icon_close_tmpl)({className});
const IconDelete = (className) => Handlebars.compile(icon_delete_tmpl)({className});
const IconDone = (className) => Handlebars.compile(icon_done_tmpl)({className});
const IconDots = (className) => Handlebars.compile(icon_dots_tmpl)({className});
const IconFile = (className) => Handlebars.compile(icon_file_tmpl)({className});
const IconLocation = (className) => Handlebars.compile(icon_location_tmpl)({className});
const IconMedia = (className) => Handlebars.compile(icon_media_tmpl)({className});
const IconMessage = (className) => Handlebars.compile(icon_message_tmpl)({className});
const IconProfile = (className) => Handlebars.compile(icon_profile_tmpl)({className});
const IconSearch = (className) => Handlebars.compile(icon_search_tmpl)({className});
const IconSettings = (className) => Handlebars.compile(icon_settings_tmpl)({className});
const IconTalks = (className) => Handlebars.compile(icon_talks_tmpl)({className});

export {
    IconAdd,
    IconArrowLeft,
    IconArrowRight,
    IconAttachment,
    IconClose,
    IconDelete,
    IconDone,
    IconDots,
    IconFile,
    IconLocation,
    IconMedia,
    IconMessage,
    IconProfile,
    IconSearch,
    IconSettings,
    IconTalks
}
