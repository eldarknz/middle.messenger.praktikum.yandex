import Block from "../../core/block";
import template from "./profile.tmpl";
import Avatar from "../../components/ui/avatar";
import Button from "../../components/ui/button";
import Link from "../../components/ui/link";
import List from "../../components/ui/list";
import { IconArrowLeft, IconMedia } from "../../components/ui/icon";
import { userData } from "../../data/userdata";
import { ROUTES } from "../../utils/constants";
import "./styles.scss";

interface IProfile {
    buttonBack: Block;
    userAvatar?: Block;
    userName: string;
    userDataList: Block;
    profileEdit: Block;
    passwordEdit: Block;
    logout: Block;
}

interface ITextBlock {
    className?: string;
    content: string;
}

class TextBlock extends Block {
    constructor(props: ITextBlock) {
        super(props);
    }
    
    render() {
        return this.compile(`
            <div
                {{#if className}}class="{{ className }}"{{/if}}
            >
                {{{content}}}
            </div>
        `, {
            className: this.props.className,
            content: this.props.content
        });
    }
}

class ProfilePage extends Block {
    constructor(props: IProfile) {

        const buttonBack = new Button({
            color: "primary",
            isCircle: true,
            content: new IconArrowLeft({}),
            events: {
                click: () => { window.router.go(ROUTES.chat.path); }
            }
        });

        const userAvatar = new Avatar({
            size: "lg",
            content: new IconMedia({
                color: "white",
                size: "xxl"
            })
        });

        const userName = "Иван";

        const userDataList = new List({
            isFlush: true,
            isFluid: true,
            content: userData.map(item => ( 
                new TextBlock({
                    className: "info-item",
                    content: `<span class="info-item__title">${item.title}</span><span class="info-item__value">${item.value}</span>`
                })
            ))
        });

        const profileActions = new List({
            isFlush: true,
            isFluid: true,
            content: [
                new Link({
                    href: ROUTES.profileEdit.path,
                    content: "Изменить данные"
                }),
                new Link({
                    href: ROUTES.passwordEdit.path,
                    content: "Изменить пароль"
                }),
                new Link({
                    href: ROUTES.home.path,
                    className: "link-red",
                    content: "Выйти"
                })
            ]
        });

        super({ ...props, buttonBack, userAvatar, userName, userDataList, profileActions });
    }
    
    render() {
        return this.compile(template, this.props);
    }
};

export default ProfilePage
