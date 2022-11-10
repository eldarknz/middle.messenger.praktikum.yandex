import Handlebars from "handlebars";
import EventBus from './eventBus';
import { v4 as uuid4 } from 'uuid';

class Block {
    static EVENTS = {
        INIT: 'init',
        FLOW_CDM: 'flow:component-did-mount',
        FLOW_CDU: 'flow:component-did-update',
        FLOW_RENDER: 'flow:render',
    } as const;

    protected _element: Nullable<HTMLElement> = null;
    _meta = null;

    /** JSDoc
     * @param {string} tagName
     * @param {Object} props
     *
     * @returns {void}
     */
    constructor(tagName = "div", props = {}) {
        const eventBus = new EventBus();

        this._meta = {
            tagName,
            props
        };

        this.props = this._makePropsProxy(props);

        this.eventBus = () => eventBus;

        this._registerEvents(eventBus);
        eventBus.emit(Block.EVENTS.INIT);
    }

    private _registerEvents(eventBus): void {
        eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
        eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
    }

    private _createResources() {
        const { tagName } = this._meta;
        this._element = this._createDocumentElement(tagName);
    }

    init(): void {
        this._createResources();
        this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }

    private _componentDidMount(): void {
        this.componentDidMount();
    }

    componentDidMount(oldProps): void {}

    dispatchComponentDidMount(): void {
        this._eventBus().emit(Block.EVENTS.FLOW_CDM);
    }

    private _componentDidUpdate(oldProps, newProps): void {
        ...
    }

    componentDidUpdate(oldProps, newProps): boolean {
        return true;
    }

    // Указываем пропсы
    setProps = nextProps => {
        if (!nextProps) {
            return;
        }

        Object.assign(this.props, nextProps);
    };

    get element(): HTMLElement {
        return this._element;
    }

    private _render() {
        const fragment = this._compile();
        const newElement = fragment.firstElementChild!;

        if (this._element) {
            // Удалить старые события
            this._removeEvents();
            this._element = null;
            //this._element!.replaceWith(newElement);
        }

        this._element = newElement as HTMLElement;
        // Навесить новые события
        this._addEvents();

        /*const block = this.render();
        // Удалить старые события через removeEventListener
        this._element.innerHTML = block;
        // Навесить новые события через addEventListener*/
    } 

    // Переопределяется пользователем. Необходимо вернуть разметку
    protected render(): string {
        return '';
    }

    getContent() {
        return this.element;
    }

    private _makePropsProxy(props) {
        // Ещё один способ передачи this, но он больше не применяется с приходом ES6+
        const self = this;

            // Здесь вам предстоит реализовать метод
        return props;
    }

    private _createDocumentElement(tagName) {
        // Можно сделать метод, который через фрагменты в цикле создаёт сразу несколько блоков
        return document.createElement(tagName);
    }

    _addEvents() {
        const {events = {}} = this.props.events;
    
        Object.keys(events).forEach(eventName => {
          this._element.addEventListener(eventName, events[eventName]);
        });
    }

    _removeEvents() {
        const events: Record<string, () => void> = (this.props as any).events;
    
        if (!events || !this._element) {
          return;
        }
    
        Object.entries(events).forEach(([event, listener]) => {
          this._element!.removeEventListener(event, listener);
        });
      }

    show() {
        this.getContent().style.display = "block";
    }

    hide() {
        this.getContent().style.display = "none";
    }
}

export default Block;