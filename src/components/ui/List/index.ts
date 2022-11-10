/*import Handlebars from "handlebars";
import template from "./List.tmpl";
import "./components/ListItem";
import "./List.scss";

const List = (props) => {
    const compiled = Handlebars.compile(template);

    const html = compiled({
        className: props.className,
        list: props.list
    })

    return html;
}

export default List*/

import Block from "../../../core/block"
import template from "./List.tmpl";
import "./List.scss";

interface IList {
  attr?: any;
  content: any;
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