import Block from "../../../core/block"
import template from "./nav.tmpl";
import "./nav.scss";
import { TBlockAttributes } from "../../../../declarations";

interface INav {
  attr?: TBlockAttributes;
  content: Block[] | string[];
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
