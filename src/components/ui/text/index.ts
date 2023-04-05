// Core
import Block from "@core/block";
// Template
import template from "./text.tmpl";

interface ILink {
  className?: string;
  content?: Block | string;
};

class Text extends Block {
  constructor(props: ILink) {
    super(props);
  }

  render() {
    return this.compile(template, {
      className: this.props.className,
      content: this.props.content
    });
  }
}

export default Text
