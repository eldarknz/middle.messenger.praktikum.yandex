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

class Profile extends Block {
    constructor(props: IProfile) {
        super(props);
    }
    
    render() {
        return this.compile(template, {
            buttonBack: this.props.buttonBack,
            userAvatar: this.props.userAvatar,
            userName: this.props.userName,
            userDataList: this.props.userDataList,
            profileEdit: this.props.profileEdit,
            passwordEdit: this.props.passwordEdit,
            logout: this.props.logout,
        });
    }
}

const ProfilePage = new Profile({
    buttonBack: new Link({
        href: ROUTES.chat.path,
        content: new Button({
            className: "btn btn-circle btn-primary",
            content: new IconArrowLeft({ className: "icon icon-white" })
        })
    }),
    userAvatar: new Avatar({
        className: "avatar avatar_size_l",
        content: new IconMedia({ className:"icon icon-white icon-size-xxl"})
    }),
    userName: "Иван",
    userDataList: new List({
        className: "list list-flush list-full",
        content: userData.map(item => ( 
            new TextBlock({
                className: "info-item",
                content: `<span class="info-item__title">${item.title}</span><span class="info-item__value">${item.value}</span>`
            })
        ))
    }),
    profileEdit: new Link({
        href: ROUTES.profileEdit.path,
        content: "Изменить данные"
    }),
    passwordEdit: new Link({
        href: ROUTES.passwordEdit.path,
        content: "Изменить пароль"
    }),
    logout: new Link({
        href: ROUTES.home.path,
        content: "Выйти"
    }),
});

export default ProfilePage
