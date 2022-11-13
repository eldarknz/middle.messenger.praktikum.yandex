import Block from "../../../core/block"
import template from "./List.tmpl";
import "./List.scss";
import { TBlockAttributes } from "../../../../declarations";

interface IList {
  attr?: TBlockAttributes;
  content: Block[] | string[];
}

class List extends Block {
  constructor(props: IList) {
    super('ul', props);
  }
  
  render() {
    return this.compile(template, {
      content: this.props.content
    });
  }
}

export default List
