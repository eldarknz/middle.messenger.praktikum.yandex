import Block from "../../../../core/block";
import template from "./AddUserForm.tmpl";
import "../../ChatHeader.scss";
import Input from "../../../ui/Input";
import Button from "../../../ui/Button";

interface IAddUserForm {
    attr?: any;
    input: Block;
    buttonSubmit: Block;
}

class AddUserForm extends Block {
    constructor(props: IAddUserForm) {
        super("div", props)
    }

    render(): DocumentFragment {
        return this.compile(template, {
            input: this.props.input,
            buttonSubmit: this.props.buttonSubmit
        })
    }
}

const AddUserFormBlock = new AddUserForm({
    attr: {
        class: "add-user-form"
    },
    input: new Input({
        attr: {
            class: "form-group"
        },
        alternative: true,
        id: "login",
        name: "login",
        placeholderText: "Логин"
    }),
    buttonSubmit: new Button({
        attr: {
            class: "btn btn-primary btn-block"
        },
        content: "Добавить пользователя"
    }),
})

export default AddUserFormBlock
