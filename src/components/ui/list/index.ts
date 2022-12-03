import Block from "../../../core/block"
import template from "./list.tmpl";
import "./list.scss";

interface IList {
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
