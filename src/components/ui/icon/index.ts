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
} from "./icons.tmpl";
import "./icon.scss";

interface IIcon {
    className?: string;
}

class IconAdd extends Block {
    constructor(props: IIcon) { super(props) }
    render() { return this.compile(icon_add, {
        className: this.props.className
    }); }
}

class IconArrowLeft extends Block {
    constructor(props: IIcon) { super(props) }
    render() { return this.compile(icon_arrow_left, {
        className: this.props.className
    }); }
}

class IconArrowRight extends Block {
    constructor(props: IIcon) { super(props) }
    render() { return this.compile(icon_arrow_right, {
        className: this.props.className
    }); }
}

class IconAttachment extends Block {
    constructor(props: IIcon) { super(props) }
    render() { return this.compile(icon_attachment, {
        className: this.props.className
    }); }
}

class IconClose extends Block {
    constructor(props: IIcon) { super(props) }
    render() { return this.compile(icon_close, {
        className: this.props.className
    }); }
}

class IconDelete extends Block {
    constructor(props: IIcon) { super(props) }
    render() { return this.compile(icon_delete, {
        className: this.props.className
    }); }
}

class IconDone extends Block {
    constructor(props: IIcon) { super(props) }
    render() { return this.compile(icon_done, {
        className: this.props.className
    }); }
}

class IconDots extends Block {
    constructor(props: IIcon) { super(props) }
    render() { return this.compile(icon_dots, {
        className: this.props.className
    }); }
}

class IconFile extends Block {
    constructor(props: IIcon) { super(props) }
    render() { return this.compile(icon_file, {
        className: this.props.className
    }); }
}

class IconLocation extends Block {
    constructor(props: IIcon) { super(props) }
    render() { return this.compile(icon_location, {
        className: this.props.className
    }); }
}

class IconMedia extends Block {
    constructor(props: IIcon) { super(props) }
    render() { return this.compile(icon_media, {
        className: this.props.className
    }); }
}

class IconMessage extends Block {
    constructor(props: IIcon) { super(props) }
    render() { return this.compile(icon_message, {
        className: this.props.className
    }); }
}

class IconProfile extends Block {
    constructor(props: IIcon) { super(props) }
    render() { return this.compile(icon_profile, {
        className: this.props.className
    }); }
}

class IconSearch extends Block {
    constructor(props: IIcon) { super(props) }
    render() { return this.compile(icon_search, {
        className: this.props.className
    }); }
}

class IconSettings extends Block {
    constructor(props: IIcon) { super(props) }
    render() { return this.compile(icon_settings, {
        className: this.props.className
    }); }
}

class IconTalks extends Block {
    constructor(props: IIcon) { super(props) }
    render() { return this.compile(icon_talks, {
        className: this.props.className
    }); }
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
