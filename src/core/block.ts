import Handlebars from 'handlebars';
import { v4 as makeUUID } from 'uuid';
import EventBus from './eventBus';

class Block<Props extends Record<string, any> = any> {
    static EVENTS = {
        INIT: 'init',
        FLOW_CDM: 'flow:component-did-mount',
        FLOW_CDU: 'flow:component-did-update',
        FLOW_RENDER: 'flow:render',
    };

    private _element: Nullable<HTMLElement> = null;

    private _meta: { tagName: string; props: object; };

    public eventBus: Function;

    public children: object;

    public props: {[key: string]: any}

    public _id: Nullable<string> = null;

    /** JSDoc
     * @param {string} tagName
     * @param {Object} propsAndChildren
     *
     * @returns {void}
     */
    constructor(tagName = 'div', propsAndChildren: Props) {
        const { children, props } = this._getChildren(propsAndChildren);

        this.children = children;
        const eventBus = new EventBus();
        this._meta = {
        tagName,
        props,
        };
        this._id = makeUUID();
        this.props = this._makePropsProxy({ ...props, __id: this._id });

        this.eventBus = () => eventBus;

        this._registerEvents(eventBus);
        eventBus.emit(Block.EVENTS.INIT);
    }

    private _getChildren(propsAndChildren: Props) {
        const children: { [key: string]: any } = {};
        const props: { [key: string]: any } = {}

        Object.entries(propsAndChildren).forEach(([key, value]) => {
        if (Array.isArray(value)) {
            children[key] = []
            value.forEach(element => {
                if (element instanceof Block) {
                    children[key].push(element);
                }
            });
        } else {
            if (value instanceof Block) {
                children[key] = value;
            } else {
                props[key] = value;
            }
        }
        });

        return { children, props };
    }

    private _registerEvents(eventBus: EventBus): void {
        eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
        eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    }

    private _createResources(): void {
        const { tagName } = this._meta;
        this._element = document.createElement(tagName);
    }

    init(): void {
        this._createResources();
        this.dispatchComponentDidMount();
        this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }

    private _componentDidMount(): void {
        this.componentDidMount();

        Object.values(this.children).forEach((child) => {
            if (Array.isArray(child)) {
                child.forEach(item => {
                    item.dispatchComponentDidMount();
                });
            } else {
                child.dispatchComponentDidMount();
            }
        });
    }

    componentDidMount(): void {}

    dispatchComponentDidMount(): void {
        this.eventBus().emit(Block.EVENTS.FLOW_CDM);
    }

    private _componentDidUpdate(oldProps: Props, newProps: Props): void {
        const response = this.componentDidUpdate(oldProps, newProps);
        if (response) {
            this._render();
        }
    }

    componentDidUpdate(oldProps: Props, newProps: Props): boolean {
        return true;
    }

    private _addEvents() {
        const { events = {} } = this.props;

        Object.keys(events).forEach((eventName) => {
            if (this._element) {
                if (eventName === 'focus' || eventName === 'blur') {
                    const elements = this._element.querySelectorAll('input');
                    elements.forEach((item) => {
                    item.addEventListener(eventName, events[eventName]);
                    });
                } else {
                    this._element.addEventListener(eventName, events[eventName]);
                }
            }
        });
    }

    private _addAttributes() {
        const { attr = {} } = this.props;

        Object.keys(attr).forEach((attrName) => {
            if (this._element) {
                this._element.setAttribute(attrName, attr[attrName]);
            }
        });
    }

    private _removeEvents() {
        const { events = {} } = this.props;

        Object.keys(events).forEach((eventName) => {
            if (this._element) {
                if (eventName === 'focus' || eventName === 'blur') {
                    const elements = this._element.querySelectorAll('input');
                    elements.forEach((item) => {
                    item.removeEventListener(eventName, events[eventName]);
                    });
                } else {
                    this._element.removeEventListener(eventName, events[eventName]);
                }
            }
        });
    }

    setProps = (nextProps: Props) => {
        if (!nextProps) {
            return;
        }

        Object.assign(this.props, nextProps);
    };

    get element(): HTMLElement {
        return this._element!;
    }

    private _render() : void {
        const block = this.render();

        this._removeEvents();
        this._element!.innerHTML = '';
        this._element!.appendChild(block);

        this._addAttributes();
        this._addEvents();
    }

    render(): DocumentFragment {
        return undefined!;
    }

    getContent() {
        return this.element;
    }

    private _makePropsProxy = (props: {[key: string|symbol]: any}) => {
        const self = this;

        return new Proxy(props, {
            set(target, prop, value) {
                const tar = target;
                tar[prop] = value;
                self.eventBus().emit(Block.EVENTS.FLOW_CDU);
                return true;
            },
            get(target, prop: string) {
                if (prop?.indexOf('_') === 0) {
                throw new Error('Доступ отсутствует!');
                }

                const value = target[prop];
                return typeof value === 'function' ? value.bind(target) : value;
            },
            deleteProperty() {
                throw new Error('Доступ отсутствует!');
            },
        });
    };

    compile(template: string, props: object) {
        const propsAndStubs: { [key: string]: any } = { ...props };
    
        const fragment = document.createElement("template");
        const compiled = Handlebars.compile(template);
    
        Object.entries(this.children).forEach(([key, child]) => {
            if (Array.isArray(child)) {
                propsAndStubs[key] = []
                child.forEach(subchild => {
                propsAndStubs[key].push(`<div data-id="${subchild._id}"></div>`);
                });
            } else {
                propsAndStubs[key] = `<div data-id="${child._id}"></div>`;
            }
        });
    
        fragment.innerHTML = compiled(propsAndStubs);

        Object.values(this.children).forEach((child) => {
            if (Array.isArray(child)) {
                child.forEach(subchild => {
                    const fragmentContent = fragment.content; 
                    const stub = fragmentContent.querySelector(`[data-id="${subchild._id}"]`);
                    stub!.replaceWith(subchild.getContent());
                });
            } else {
                const fragmentContent = fragment.content; 
                const stub = fragmentContent.querySelector(`[data-id="${child._id}"]`);
                stub!.replaceWith(child.getContent());
            }
        });

        return fragment.content;
    }

    show() {
        this._element!.style.display = 'block';
    }

    hide() {
        this._element!.style.display = 'none';
    }
}

export default Block;
