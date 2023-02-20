import Block from "../../../core/block";
import template from "./chatSidebar.tmpl";
import Button from "../../ui/button";
import Nav from "../../ui/nav";
import Input from "../../ui/input";
import Link from "../../ui/link";
import Logo from "../../ui/logo";
import ChatListBlock from "../chatList/chatList";
import {
    IconMessage,
    IconProfile,
    IconTalks,
    IconSettings,
    IconSearch,
    IconLogout
} from "../../ui/icon";
import AuthController from "../../../core/controllers/authContorller";
import { ROUTES } from "../../../utils/constants";
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
    logoLink: new Logo({
        link: ROUTES.home.path
    }),
    newMessageIcon: new IconMessage({ className: "icon icon-size-m" }),
    inputSearch: new Input({
        id: "search",
        name: "search",
        placeholderText: "Поиск",
        //placeholderPosition: "center",
        //placeholderIcon: new IconSearch({ className: "icon" })
    }),
    content: ChatListBlock,
    nav: new Nav({
        className: "nav",
        content: [
            new Button({
                size: "lg",
                isSquare: true,
                content: new IconProfile(),
                events: {
                    click: () => { window.router.go(ROUTES.profile.path); }
                }
            }),
            new Button({
                size: "lg",
                isSquare: true,
                content: new IconSettings(),
                events: {
                    click: () => { window.router.go(ROUTES.profileEdit.path); }
                }
            }),
            new Button({
                size: "lg",
                isSquare: true,
                content: new IconLogout(),
                events: {
                    click: async (e: Event) => {
                        e.preventDefault();
                        await AuthController.logout();
                    }
                },
            })
        ]
        
    })
})

export default ChatSidebarBlock
