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
    size?: "xs" | "m" | "lg" | "xl" | "xxl";
    color?: "white" | "light" | "dark" | "primary" | "secondary";
    className?: string;
}

class IconBlock extends Block {
    constructor(props: IIcon) {
        super(props);
        this.iconClassName = this.iconClassName.bind(this);
    }

    iconClassName() {
        let className = "icon";
        if (this.props.size) className += ` icon-${this.props.size}`
        if (this.props.color) className +=  ` icon-${this.props.color}`
        if (this.props.className) className += ` ${this.props.className}`
        return className;
    }
}

class IconAdd extends IconBlock {
    render() { return this.compile(icon_add, {
        className: this.iconClassName(),
    }); }
}

class IconArrowLeft extends IconBlock {
    render() { return this.compile(icon_arrow_left, {
        className: this.iconClassName(),
    }); }
}

class IconArrowRight extends IconBlock {
    render() { return this.compile(icon_arrow_right, {
        className: this.iconClassName(),
    }); }
}

class IconAttachment extends IconBlock {
    render() { return this.compile(icon_attachment, {
        className: this.iconClassName(),
    }); }
}

class IconClose extends IconBlock {
    render() { return this.compile(icon_close, {
        className: this.iconClassName(),
    }); }
}

class IconDelete extends IconBlock {
    render() { return this.compile(icon_delete, {
        className: this.iconClassName(),
    }); }
}

class IconDone extends IconBlock {
    render() { return this.compile(icon_done, {
        className: this.iconClassName(),
    }); }
}

class IconDots extends IconBlock {
    render() { return this.compile(icon_dots, {
        className: this.iconClassName(),
    }); }
}

class IconFile extends IconBlock {
    render() { return this.compile(icon_file, {
        className: this.iconClassName(),
    }); }
}

class IconLocation extends IconBlock {
    render() { return this.compile(icon_location, {
        className: this.iconClassName(),
    }); }
}

class IconMedia extends IconBlock {
    render() { return this.compile(icon_media, {
        className: this.iconClassName(),
    }); }
}

class IconMessage extends IconBlock {
    render() { return this.compile(icon_message, {
        className: this.iconClassName(),
    }); }
}

class IconProfile extends IconBlock {
    render() { return this.compile(icon_profile, {
        className: this.iconClassName(),
    }); }
}

class IconSearch extends IconBlock {
    render() { return this.compile(icon_search, {
        className: this.iconClassName(),
    }); }
}

class IconSettings extends IconBlock {
    render() { return this.compile(icon_settings, {
        className: this.iconClassName(),
    }); }
}

class IconTalks extends IconBlock {
    render() { return this.compile(icon_talks, {
        className: this.iconClassName(),
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
