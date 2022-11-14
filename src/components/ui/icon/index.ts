import Block from "../../../core/block";
import {
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
} from "./Icons.tmpl";
import "./Icon.scss";
import { TBlockAttributes } from "../../../../declarations";

interface IIcon {
    attr?: TBlockAttributes;
}

class IconAdd extends Block {
    constructor(props: IIcon) { super('div', props) }
    render() { return this.compile(icon_add, {}); }
}

class IconArrowLeft extends Block {
    constructor(props: IIcon) { super('div', props) }
    render() { return this.compile(icon_arrow_left, {}); }
}

class IconArrowRight extends Block {
    constructor(props: IIcon) { super('div', props) }
    render() { return this.compile(icon_arrow_right, {}); }
}

class IconAttachment extends Block {
    constructor(props: IIcon) { super('div', props) }
    render() { return this.compile(icon_attachment, {}); }
}

class IconClose extends Block {
    constructor(props: IIcon) { super('div', props) }
    render() { return this.compile(icon_close, {});}
}

class IconDelete extends Block {
    constructor(props: IIcon) { super('div', props) }
    render() { return this.compile(icon_delete, {}); }
}

class IconDone extends Block {
    constructor(props: IIcon) { super('div', props) }
    render() { return this.compile(icon_done, {}); }
}

class IconDots extends Block {
    constructor(props: IIcon) { super('div', props) }
    render() { return this.compile(icon_dots, {}); }
}

class IconFile extends Block {
    constructor(props: IIcon) { super('div', props) }
    render() { return this.compile(icon_file, {}); }
}

class IconLocation extends Block {
    constructor(props: IIcon) { super('div', props) }
    render() { return this.compile(icon_location, {}); }
}

class IconMedia extends Block {
    constructor(props: IIcon) { super('div', props) }
    render() { return this.compile(icon_media, {}); }
}

class IconMessage extends Block {
    constructor(props: IIcon) { super('div', props) }
    render() { return this.compile(icon_message, {}); }
}

class IconProfile extends Block {
    constructor(props: IIcon) { super('div', props) }
    render() { return this.compile(icon_profile, {}); }
}

class IconSearch extends Block {
    constructor(props: IIcon) { super('div', props) }
    render() { return this.compile(icon_search, {}); }
}

class IconSettings extends Block {
    constructor(props: IIcon) { super('div', props) }
    render() { return this.compile(icon_settings, {}); }
}

class IconTalks extends Block {
    constructor(props: IIcon) { super('div', props) }
    render() { return this.compile(icon_talks, {}); }
}


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
