import Block from "../../../../core/block";
import template from "./MediaActions.tmpl";

interface IMediaActions {
    attr?: any;
    addMediaIcon: Block,
    addFileIcon: Block,
    addLocationIcon: Block
}

class MediaActions extends Block {
    constructor(props: IMediaActions) {
        super('div', props)
    }

    render() {
        return this.compile(template, {
            addMediaIcon: this.props.addMediaIcon,
            addFileIcon: this.props.addFileIcon,
            addLocationIcon: this.props.addLocationIcon
        })
    }
}

export default MediaActions