import Block from "../../core/block";
import template from "./profile.tmpl";
import Avatar from "../../components/ui/Avatar";
import Button from "../../components/ui/Button";
import Link from "../../components/ui/Link";
import List from "../../components/ui/List";
import { IconArrowLeft, IconMedia } from "../../components/ui/Icon";
import { userData } from "../../data/userdata";
import { TBlockAttributes } from "../../../declarations";
import "./styles.scss";

interface ITextBlock {
    attr?: TBlockAttributes;
    content: string;
}

class TextBlock extends Block {
    constructor(props: ITextBlock) {
        super('div', props);
    }
    
    render() {
        return this.compile(`{{{content}}}`, {
            content: this.props.content
        });
    }
}

interface IProfile {
    attr?: TBlockAttributes;
    buttonBack: Block;
    userAvatar?: Block;
    userName: string;
    userDataList: Block;
}

class Profile extends Block {
    constructor(props: IProfile) {
        super('div', props);
    }
    
    render() {
        return this.compile(template, {
            buttonBack: this.props.buttonBack,
            userAvatar: this.props.userAvatar,
            userName: this.props.userName,
            userDataList: this.props.userDataList
        });
    }
}

const ProfilePage = new Profile({
    attr: {
        class: "wrapper"
    },
    buttonBack: new Link({
        attr: {
            href: "/chat"
        },
        content: new Button({
            attr: {
                class: "btn btn-circle btn-primary"
            },
            content: new IconArrowLeft({ attr: { class: "icon icon-white" }})
        })
    }),
    userAvatar: new Avatar({
        attr: {
            class: "avatar avatar_size_l"
        },
        content: new IconMedia({ attr: { class:"icon icon-white icon-size-xxl"}})
    }),
    userName: "Иван",
    userDataList: new List({
        attr: {
            class: "list list-flush list-full"
        },
        content: userData.map(item => ( 
            new TextBlock({
                attr: {
                    class: "info-item"
                },
                content: `<span class="info-item__title">${item.title}</span><span class="info-item__value">${item.value}</span>`
            })
        ))
    })
});

export default ProfilePage
