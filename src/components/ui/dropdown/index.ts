// Core
import { Block } from "@core/block";
// Components
import { Button } from "@components/ui/button";
// Template
import template from "./dropdown.tmpl";
// Styles
import "./dropdown.scss";

interface IDropdown {
    className?: string;
    id?: string;
    dropdownButtonSize?: "sm" | "lg" | "xl";
    dropdownButtonColor?: "primary" | "secondary" | "light";
    dropdownButtonIsFluid?: boolean;
    dropdownButtonShape?: "rounded" | "circle" | "square";
    dropdownButtonView?: "outline" | "link";
    dropdownButtonContent: Block;
    dropdownMenuContent: Block | string;
}

const dropdownHide = () => {
    const dropdowns: NodeListOf<HTMLElement> = document.querySelectorAll('.dropdown');
    dropdowns.forEach((dropdown: HTMLElement) => {
        if (dropdown.classList.contains('show')) {
            let button = <HTMLElement>dropdown.querySelector('#dropdownMenuButton');
            button.classList.remove('active');
            dropdown.classList.remove('show');
        }
    });
    window.removeEventListener('click', dropdownHidehandler);
}

const dropdownHidehandler = (event: Event) => {
    const target = event.target as HTMLElement;
    if (target.closest('.dropdown-menu') || target.closest('#dropdownMenuButton')) {
        if (!target.closest('.dropdown-item')) {
            return;
        }
    };

    dropdownHide();
};

const dropdownHandler = (event: Event) => {
    const button = event.currentTarget as HTMLElement;
    const dropdown = button.closest('.dropdown');
    if (dropdown) {
        if (dropdown.classList.contains('show')) {
            button.classList.remove('active');
            dropdown.classList.remove('show');
            window.removeEventListener('click', dropdownHidehandler);
        } else {
            dropdownHide();
            button.classList.add('active');
            dropdown.classList.add('show');
            window.addEventListener('click', dropdownHidehandler);
        }
    };
};

export class Dropdown extends Block {
    constructor(props: IDropdown) {

        const dropdownButton = new Button({
            id: "dropdownMenuButton",
            size: props.dropdownButtonSize,
            color: props.dropdownButtonColor,
            isFluid: props.dropdownButtonIsFluid,
            shape: props.dropdownButtonShape,
            view: props.dropdownButtonView,
            content: props.dropdownButtonContent,
            events: {
                click: dropdownHandler
            }
        })

        super({ ...props, dropdownButton })
        this.dropdownClassName = this.dropdownClassName.bind(this);
    }

    dropdownClassName() {
        let className = "dropdown";
        if (this.props.className) className += ` ${this.props.className}`
        return className;
    }

    render() {
        return this.compile(template, {
            className: this.dropdownClassName(),
            id: this.props.id,
            dropdownMenuContent: this.props.dropdownMenuContent
        })
    }
}
