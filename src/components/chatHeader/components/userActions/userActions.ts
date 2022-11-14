import { TBlockAttributes } from "../../../../../declarations";
import Block from "../../../../core/block";
import template from "./userActions.tmpl";

interface IUserActions {
    attr?: TBlockAttributes;
    dataToggle?: string,
    dataTarget?: string,
    addUserIcon: Block,
    deleteUserIcon: Block
}

class UserActions extends Block {
    constructor(props: IUserActions) {
        super('div', props)
    }

    render() {
        return this.compile(template, {
            dropdownButton: this.props.dropdownButton,
            dataToggle: this.props.dataToggle,
            dataTarget: this.props.dataTarget,
            addUserIcon: this.props.addUserIcon,
            deleteUserIcon: this.props.deleteUserIcon
        })
    }
}

export default UserActions
