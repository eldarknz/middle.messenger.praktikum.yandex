import { TBlockAttributes } from "../../../../declarations";
import Block from "../../../core/block";
import template from "./link.tmpl";

interface ILink {
  attr?: TBlockAttributes;
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
