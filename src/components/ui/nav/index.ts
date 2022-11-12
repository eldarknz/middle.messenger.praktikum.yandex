import Block from "../../../core/block"
import template from "./Nav.tmpl";
import "./Nav.scss";

interface INav {
  attr?: any;
  content: any;
}

class Nav extends Block {
  constructor(props: INav) {
    super('nav', props);
  }
  
  render() {
    return this.compile(template, {
      content: this.props.content
    });
  }
}

export default Nav
