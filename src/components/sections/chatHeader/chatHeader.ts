import Block from "../../../core/block";
import template from "./chatHeader.tmpl";
import Dropdown from "../../ui/dropdown";
import Button from "../../ui/button";
import Avatar from "../../ui/avatar";
import { IconAdd, IconDelete, IconDots } from "../../ui/icon";
import Skeleton from "../../ui/skeleton";
import Image from "../../ui/image";
import Text from "../../ui/text";
import UserActions from "./components/userActions/userActions";
import AuthController from "../../../core/controllers/authContorller";
import { TBlockAttributes } from "../../../../declarations";
import connect, { Indexed } from "../../../core/store/connect";
import { IUser } from "../../../types";
import { API_RESOURCES_PATH } from "../../../utils/constants";
import "./chatHeader.scss";

interface IChatHeader {
    attr?: TBlockAttributes;
    userAvatar: Block;
    userName: string;
    dropdown: Block;
}

const getUserAvatar = (state: Indexed) => {
    if (Object.keys(state).length !== 0) {
        if ((state.user as IUser).avatar != null) {
            return new Avatar({
                content: new Image({
                    src: API_RESOURCES_PATH + (state.user as IUser).avatar
                })
            });
        } else {
            return new Avatar();
        }
    } else {
        return new Skeleton({
            width: 34,
            isAnimation: true,
            isCircle: true
        });
    }
}

const getUserName = (state: Indexed) => {
    if (Object.keys(state).length !== 0) {
        return new Text({
            content: (state.user as IUser).first_name
        });
    } else {
        return new Skeleton({
            height: 18,
            isAnimation: true
        });
    }
}

class ChatHeader extends Block {
    constructor(props?: IChatHeader) {

        const dropdown = new Dropdown({
            className: "dropdown",
            dropdownButton: new Button({
                isCircle: true,
                id: "dropdownMenuButton",
                content: new IconDots({ className: "icon icon-size-m" })
            }),
            content: new UserActions({
                dataToggle: "modal",
                dataTarget: "addUserModal",
                addUserIcon: new IconAdd({ className: "icon icon-size-l icon-primary" }),
                deleteUserIcon: new IconDelete({ className: "icon icon-size-l icon-primary" })
            })
        })

        super({ ...props, dropdown });

        AuthController.getUserInfo();
    }
    
    render() {
        return this.compile(template, this.props);
        /*return this.compile(template, {
            userAvatar: this.props.userAvatar,
            userName: this.props.userName,
            dropdown: this.props.dropdown
        });*/
    }
}

/*const ChatHeader = new ChatHeader({
    userAvatar: new Avatar(),
    userName: "Иван",
    dropdown: new Dropdown({
        className: "dropdown",
        dropdownButton: new Button({
            isCircle: true,
            id: "dropdownMenuButton",
            content: new IconDots({ className: "icon icon-size-m" })
        }),
        content: new UserActions({
            dataToggle: "modal",
            dataTarget: "addUserModal",
            addUserIcon: new IconAdd({ className: "icon icon-size-l icon-primary" }),
            deleteUserIcon: new IconDelete({ className: "icon icon-size-l icon-primary" })
        })
    })
})*/

//export default ChatHeaderBlock

const withPage = connect((state) => ({
    userAvatar: getUserAvatar(state),
    userName: getUserName(state),
    //userDataList: getUserDataList(state)
}));

const ChatHeaderSection = withPage(ChatHeader);

export default ChatHeaderSection
