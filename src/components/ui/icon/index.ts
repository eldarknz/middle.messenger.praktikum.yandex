// Core
import { Block } from '@core/block';
// Template
import {
    iconAdd,
    iconArrowLeft,
    iconArrowRight,
    iconAttachment,
    iconClose,
    iconDelete,
    iconDone,
    iconDots,
    iconFile,
    iconLogout,
    iconLocation,
    iconMedia,
    iconMessage,
    iconProfile,
    iconSearch,
    iconSettings,
    iconSuccess,
    iconTalks,
    iconTrash,
    iconPhoto,
    iconAddUser,
    iconWrite
} from './icons.tmpl';
// Styles
import './icon.scss';

type TIconName = "add" |
    "arrowLeft" |
    "arrowRight" |
    "attachment" |
    "close" |
    "delete" |
    "done" |
    "dots" |
    "file" |
    "logout" |
    "location" |
    "media" |
    "message" |
    "profile" |
    "search" |
    "settings" |
    "success" |
    "talks" |
    "trash" |
    "photo" |
    "addUser" |
    "write";

interface IIcon {
    name: TIconName,
    size?: 'xs' | 'm' | 'lg' | 'xl' | 'xxl';
    color?: 'white' | 'light' | 'dark' | 'primary' | 'secondary' | 'success';
    className?: string;
}

const iconsLib = {
    "add": iconAdd,
    "arrowLeft": iconArrowLeft,
    "arrowRight": iconArrowRight,
    "attachment": iconAttachment,
    "close": iconClose,
    "delete": iconDelete,
    "done": iconDone,
    "dots": iconDots,
    "file": iconFile,
    "logout": iconLogout,
    "location": iconLocation,
    "media": iconMedia,
    "message": iconMessage,
    "profile": iconProfile,
    "search": iconSearch,
    "settings": iconSettings,
    "success": iconSuccess,
    "talks": iconTalks,
    "trash": iconTrash,
    "photo": iconPhoto,
    "addUser": iconAddUser,
    "write": iconWrite
};

export class Icon extends Block {
    constructor(props: IIcon) {
        super(props);
        this.iconClassName = this.iconClassName.bind(this);
    }

    iconClassName() {
        let className = 'icon';
        if (this.props.size !== undefined) className += ` icon-${this.props.size}`;
        if (this.props.color !== undefined) className += ` icon-${this.props.color}`;
        if (this.props.className !== undefined) className += ` ${this.props.className}`;
        return className;
    }

    render() {
        return this.compile(iconsLib[this.props.name as TIconName], {
            className: this.iconClassName(),
        });
    }
}
