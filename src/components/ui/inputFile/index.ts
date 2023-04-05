// Core
import Block from "@core/block";
// Template
import template from "./inputFile.tmpl";
// Styles
import "./inputFile.scss";

interface IInputFile {
    className?: string;
    color?: "primary" | "secondary" | "light";
    type?: string;
    id: string;
    name: string;
    placeholderText: string;
    isAcceptImage?: boolean;
    events?: { 
        change?: (e: Event) => void;
    };
}

const defaultInputFileHandler = (e: Event) => {
    console.log("defaultInputFileHandler");
    const target = e.target as HTMLInputElement;
    if (target && target.files) {
        const labelId = target.getAttribute("aria-labelledby");
        if (labelId) {
            const label = document.getElementById(labelId);
            if (label)
                label.innerHTML = target.files[0].name;
        }
    }
};

class InputFile extends Block {
    constructor(props: IInputFile) {
        super({...props, events: { change: props.events?.change ?? defaultInputFileHandler }})
        this.inputFileClassName = this.inputFileClassName.bind(this);
    }

    inputFileClassName() {
        let className = "input-file-container";
        if (this.props.className) className += ` ${this.props.className}`
        return className;
    }

    render() {
        return this.compile(template, {
            className: this.inputFileClassName(),
            type: "file",
            id: this.props.id,
            name: this.props.name,
            placeholderText: this.props.placeholderText,
            acceptImage: this.props.isAcceptImage
        });
    }
}
  
export default InputFile
