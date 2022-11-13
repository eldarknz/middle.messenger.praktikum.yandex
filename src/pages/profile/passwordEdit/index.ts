import Block from "../../../core/block";
import template from "./passwordEdit.tmpl";
import Avatar from "../../../components/ui/Avatar";
import Button from "../../../components/ui/Button";
import Link from "../../../components/ui/Link";
import List from "../../../components/ui/List";
import { IconArrowLeft, IconMedia } from "../../../components/ui/Icon";
import { userData } from "../../../data/userdata";
import { TBlockAttributes } from "../../../../declarations";
import "../styles.scss";

interface IPasswordEdit {
    attr?: TBlockAttributes;
    buttonBack: Block;
    userAvatar: Block;
    userDataList?: Block;
    buttonSave: Block;
}

class PasswordEdit extends Block {
    constructor(props: IPasswordEdit) {
        super("div", props)
    }

    render() {
        return this.compile(template, {
            buttonBack: this.props.buttonBack,
            userAvatar: this.props.userAvatar,
            userDataList: this.props.userDataList,
            buttonSave: this.props.buttonSave,
        })
    }
}

const PasswordEditPage = new PasswordEdit({
    attr: {
        class: "wrapper"
    },
    buttonBack: new Link({
        attr: {
            href: "/profile"
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
    //userDataList: Block;
    buttonSave: new Button({
        attr: {
            class: "btn btn-primary"
        },
        content: "Сохранить изменения"
    })
})

export default PasswordEditPage
