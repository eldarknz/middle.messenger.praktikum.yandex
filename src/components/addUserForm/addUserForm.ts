import Block from "../../core/block";
import template from "./addUserForm.tmpl";
import Button from "../ui/button";
import Input from "../ui/input";
import "./addUserForm.scss";

interface IAddUserForm {
    input: Block;
    buttonSubmit: Block;
}

class AddUserForm extends Block {
    constructor(props: IAddUserForm) {
        super(props)
    }

    render(): DocumentFragment {
        return this.compile(template, {
            input: this.props.input,
            buttonSubmit: this.props.buttonSubmit
        })
    }
}

const AddUserFormBlock = new AddUserForm({
    input: new Input({
        alternative: true,
        id: "login",
        name: "login",
        placeholderText: "Логин"
    }),
    buttonSubmit: new Button({
        className: "btn btn-primary btn-block",
        content: "Добавить пользователя"
    }),
})

export default AddUserFormBlock
