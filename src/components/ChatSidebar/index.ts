import template from "./ChatSidebar.tmpl";
import Nav from "../ui/Nav";
import Input from "../../components/ui/Input";
import Link from "../ui/Link";
import {
    IconMessage,
    IconProfile,
    IconTalks,
    IconSettings,
    IconSearch
} from "../../components/ui/Icon";
import "./ChatSidebar.scss";
import Block from "../../core/block";
import ChatListBlock from "../ChatList";

interface IChatSidebar {
    attr?: any;
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
            { url: "/profile", content: new IconProfile({ attr: { class: "icon icon-size-l" }})},
            { url: "/", content: new IconTalks({ attr: { class: "icon icon-size-l" }})},
            { url: "javascript:void(0);", content: new IconSettings({ attr: { class: "icon icon-size-l" }})}
        ].map(link => (
            new Link({
                attr: { class: "nav-link", href: link.url },
                content: link.content
            })
        ))
    })
})

export default ChatSidebarBlock
