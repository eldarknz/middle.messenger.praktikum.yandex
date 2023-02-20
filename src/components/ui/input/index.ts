import Block from "../../../core/block";
import template from "./input.tmpl";
import "./input.scss";

interface IInput {
    style?: "flush" | "outlined" | "filled";
    type?: string;
    id: string;
    name: string;
    value?: string | Function;
    placeholderText: string;
    passwordVisibilityToggler?: boolean;
    events?: { 
        blur?: (e: Event) => void;
        focus?: (e: Event) => void;
        input?: (e: Event) => void;
    };
}

const defaultInputHandler = (e: Event) => {
    const target = e.target as HTMLInputElement;
    if (target) {
        console.log(target);
        target.setAttribute('value', target.value);
    }
};

// TODO: добавить переключатель видимости пароля
class PasswordVisibilityTogglerBlock extends Block {
    constructor(props: { content: Block }) {
        const content = "";

        super({ ...props, content });
    }
    
    render() {
        return this.compile(`
            <div class="input-container__password-toggler">{{{content}}}</div>
        `, this.props);
    }
}

class Input extends Block {
    constructor(props: IInput) {
        super({...props, events: { ...props.events, input: props.events?.input ?? defaultInputHandler }})
        this.inputClassName = this.inputClassName.bind(this);
    }

    inputClassName() {
        let className = "input-container";
        if (this.props.style) className +=  ` input-${this.props.style}`
        if (this.props.className) className += ` ${this.props.className}`
        return className;
    }

    render() {
        return this.compile(template, {
            className: this.inputClassName(),
            type: this.props.type ? this.props.type : "text",
            id: this.props.id,
            name: this.props.name,
            value: this.props.value,
            placeholderText: this.props.placeholderText
        });
    }
}
  
export default Input
