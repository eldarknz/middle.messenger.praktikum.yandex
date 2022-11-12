import Block from "../../../core/block";
import template from "./Link.tmpl";

interface ILink {
  attr?: any;
  content?: Block | string;
}

class Link extends Block {
  constructor(props: ILink) {
    super('a', props);
  }

  render() {
    return this.compile(template, {
      content: this.props.content
    });
  }
}

export default Link
