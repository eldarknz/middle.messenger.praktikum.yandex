// Core
import Block from "@core/block";
// Template
import template from "./list.tmpl";
// Styles
import "./list.scss";

interface IList {
  isFlush?: boolean;
  isFluid?: boolean;
  className?: string;
  content: Block[] | string[];
}

class List extends Block {
  constructor(props: IList) {
    super(props);
    this.listClassName = this.listClassName.bind(this);
  }
  
  listClassName() {
      let className = "list";
      if (this.props.isFlush) className += " list-flush"
      if (this.props.isFluid) className += " list-fluid"
      if (this.props.className) className += ` ${this.props.className}`
      return className;
  }

  render() {
    return this.compile(template, {
      className: this.listClassName(),
      content: this.props.content
    });
  }
}

export default List
