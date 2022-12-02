import { TBlockAttributes } from "../../../../declarations";
import Block from "../../../core/block";
import template from "./link.tmpl";
import Router from "../../../core/router";

interface ILink {
  attr?: TBlockAttributes;
  className?: string;
  href?: string;
  content?: Block | string;
  //onClick?: () => void;
  events?: { 
    click?: (e: Event) => void;
  }
};

export const linkPathRedirect = (event: MouseEvent, path: string) => {
  console.log(event.currentTarget);

  window.location.href = path;

  event.preventDefault();
}

export const routerGo = (event: MouseEvent, router: Router, path: string) => {
  router.go(path);

  event.preventDefault();
}

class Link extends Block {
  constructor(props: ILink) {
    /*const onClick = (e: MouseEvent) => {
      //const router = new Router();

      //router.go(this.props.to);

      e.preventDefault();
    }

    super({...props, events: { click: onClick }});*/
    super(props);
  }

  render() {
    return this.compile(template, {
      className: this.props.className,
      href: this.props.href,
      content: this.props.content
    });
  }
}

export default Link
