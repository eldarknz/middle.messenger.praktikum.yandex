/*import Handlebars from "handlebars";
import template from "./Link.tmpl";

Handlebars.registerPartial("Link", template);

const Link = (props) => {
    const compiled = Handlebars.compile(template);

    const html = compiled({
        className: props.className,
        href: props.href,
        content: props.content
    })

    return html;
}

export default Link*/

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