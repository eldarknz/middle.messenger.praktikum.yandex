import Block from "../../../core/block"
import template from "./list.tmpl";
import "./list.scss";
import { TBlockAttributes } from "../../../../declarations";

interface IList {
  attr?: TBlockAttributes;
  className?: string;
  content: Block[] | string[];
}

class List extends Block {
  constructor(props: IList) {
    super(props);
  }
  
  render() {
    return this.compile(template, {
      className: this.props.className,
      content: this.props.content
    });
  }
}

export default List
