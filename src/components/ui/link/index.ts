// Core
import Block from "@core/block";
import Router from "@core/router";
// Template
import template from "./link.tmpl";

interface ILink {
  className?: string;
  href?: string;
  content?: Block | string;
  events?: { 
    click?: (e: Event) => void;
  };
};

export const linkPathRedirect = (event: MouseEvent, path: string) => {
  window.location.href = path;

  event.preventDefault();
}

export const routerGo = (event: MouseEvent, router: Router, path: string) => {
  router.go(path);

  event.preventDefault();
}

class Link extends Block {
  constructor(props: ILink) {
    const defaultClickHandler = (e: MouseEvent) => {
      if (this.props.href)
        window.router!.go(this.props.href);

      e.preventDefault();
    }

    super({...props, events: { click: props.events?.click ?? defaultClickHandler }});
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
