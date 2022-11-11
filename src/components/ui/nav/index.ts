import Block from "../../../core/block"
import template from "./Nav.tmpl";
import "./Nav.scss";

interface INav {
  attr?: any;
  content: { link: string, content: Block | string }[];
}

class Nav extends Block {
  constructor(props: INav) {
    super('ul', props);
  }
  
  render() {
    return this.compile(template, {
      content: this.props.content
    });
  }
}

export default Nav