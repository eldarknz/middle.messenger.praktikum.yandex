import Block from "../../core/block";
import template from "./chatSidebar.tmpl";
import Nav from "../ui/nav";
import Input from "../ui/input";
import Link from "../ui/link";
import ChatListBlock from "../chatList/chatList";
import {
    IconMessage,
    IconProfile,
    IconTalks,
    IconSettings,
    IconSearch
} from "../ui/icon";
import { ROUTES } from "../../utils/constants";
import "./chatSidebar.scss";

interface IChatSidebar {
    logoLink: Block;
    newMessageIcon: Block;
    inputSearch: Block;
    content: Block | string;
    nav: Block;
}

class ChatSidebar extends Block {
    constructor(props: IChatSidebar) {
        super(props)
    }

    render() {
        return this.compile(template, {
            logoLink: this.props.logoLink,
            newMessageIcon: this.props.newMessageIcon,
            inputSearch: this.props.inputSearch,
            content: this.props.content,
            nav: this.props.nav
        })
    }
}

const ChatSidebarBlock = new ChatSidebar({
    logoLink: new Link({
        href: ROUTES.home.path
    }),
    newMessageIcon: new IconMessage({ className: "icon icon-size-m" }),
    inputSearch: new Input({
        alternative: false,
        id: "search",
        name: "search",
        placeholderText: "Поиск",
        placeholderPosition: "center",
        placeholderIcon: new IconSearch({ className: "icon" })
    }),
    content: ChatListBlock,
    nav: new Nav({
        className: "nav",
        content: [
            { url: ROUTES.chat.path, content: new IconTalks({ className: "icon icon-size-l" })},
            { url: ROUTES.profile.path, content: new IconProfile({ className: "icon icon-size-l" })},
            { url: ROUTES.profileEdit.path, content: new IconSettings({ className: "icon icon-size-l" })}
        ].map(link => (
            new Link({
                className: "nav-link",
                href: link.url,
                content: link.content
            })
        ))
    })
})

export default ChatSidebarBlock
