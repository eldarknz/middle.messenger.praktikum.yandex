import Block from "../../../core/block"
import template from "./nav.tmpl";
import "./nav.scss";

interface INav {
  className?: string;
  content: Block[] | string[];
}

class Nav extends Block {
  constructor(props: INav) {
    super(props);
  }
  
  render() {
    return this.compile(template, {
      className: this.props.className,
      content: this.props.content
    });
  }
}

export default Nav
