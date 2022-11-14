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
import { TBlockAttributes } from "../../../declarations";
import "./chatSidebar.scss";

interface IChatSidebar {
    attr?: TBlockAttributes;
    newMessageIcon: Block,
    inputSearch: Block;
    content: Block | string;
    nav: Block;
}

class ChatSidebar extends Block {
    constructor(props: IChatSidebar) {
        super("div", props)
    }

    render() {
        return this.compile(template, {
            newMessageIcon: this.props.newMessageIcon,
            inputSearch: this.props.inputSearch,
            content: this.props.content,
            nav: this.props.nav
        })
    }
}

const ChatSidebarBlock = new ChatSidebar({
    attr: {
        class: "chat-sidebar"
    },
    newMessageIcon: new IconMessage({ attr: { class: "icon icon-size-m" }}),
    inputSearch: new Input({
        attr: {
            class: "form-group"
        },
        alternative: false,
        id: "search",
        name: "search",
        placeholderText: "Поиск",
        placeholderPosition: "center",
        placeholderIcon: new IconSearch({ attr: { class: "icon"}})
    }),
    content: ChatListBlock,
    nav: new Nav({
        attr: {
            class: "nav"
        },
        content: [
            { url: "/chat", content: new IconTalks({ attr: { class: "icon icon-size-l" }})},
            { url: "/profile", content: new IconProfile({ attr: { class: "icon icon-size-l" }})},
            { url: "/profile/edit", content: new IconSettings({ attr: { class: "icon icon-size-l" }})}
        ].map(link => (
            new Link({
                attr: { class: "nav-link", href: link.url },
                content: link.content
            })
        ))
    })
})

export default ChatSidebarBlock
