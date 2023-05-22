// External libraries
import Handlebars from 'handlebars';
import { v4 as makeUUID } from 'uuid';
// Core
import { EventBus } from '@core/eventBus';

export type Children = Record<string, any>;

export class Block {
    static EVENTS = {
        INIT: 'init',
        FLOW_CDM: 'flow:component-did-mount',
        FLOW_CDU: 'flow:component-did-update',
        FLOW_RENDER: 'flow:render',
    };

    _element: Nullable<HTMLElement> = null;

    _id: Nullable<string> = null;

    public children: Children;
    
    public props: { [key: string]: any };

    eventBus: () => EventBus;

    constructor(propsAndChidren?: TProps) {

        // 1. Получение пропсов и детей
        const { children, props } = this._getPropsAndChildren(propsAndChidren || {} as TProps);

        this.children = children;

        const eventBus = new EventBus();

        this._id = makeUUID();
        // 2. Проксирование пропсов
        this.props = this._makePropsProxy({ ...props, __id: this._id } || {} as TProps);

        this.eventBus = () => eventBus;

        // 3. Регистрация событий
        this._registerEvents(eventBus);
        // 4. Запуск инциализации
        eventBus.emit(Block.EVENTS.INIT);
    }

    // 1. Получение пропсов и детей
    _getPropsAndChildren(propsAndChildren: TProps) {
        const children: { [key: string]: any } = {};
        const props: TProps = {} as TProps;

        Object.entries(propsAndChildren).forEach(([key, value]) => {
            if (value instanceof Block) {
                children[key] = [value];
            } else if (Array.isArray(value)) {
                value.forEach(item => {
                    if (item instanceof Block) {
                        if(!Object.prototype.hasOwnProperty.call(children, key)) {
                        //if (!children.hasOwnProperty(key)) {
                            children[key] = []
                        }
                        children[key].push(item);
                    }
                });
            } else {
                const k = key as keyof TProps;
                props[k] = value;
            }
        });

        return { children, props };
    }

    // 2. Проксирование пропсов
    _makePropsProxy = (props: TProps) => {
        const self = this;

        return new Proxy(props as unknown as object, {
            set(target: Record<string, unknown>, prop: string, value: unknown) {
                target[prop] = value;
                self.eventBus().emit(Block.EVENTS.FLOW_CDU);
                return true;
            },
            get(target: Record<string, unknown>, prop: string) {
                const value = target[prop];
                return typeof value === 'function' ? value.bind(target) : value;
            },
            deleteProperty() {
                throw new Error('Доступ отсутствует!');
            },
        });
    };

    // 3. Регистрация событий
    _registerEvents(eventBus: EventBus): void {
        eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
        eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    }

    _createDocumentElement(tagName: string) {
        return document.createElement(tagName);
    }

    // 5. Создание элемента
    _createResources(): void {
        this._element = this._createDocumentElement('div');
    }

    // 4.1. Инициализация компонента
    init(): void {
        this._createResources();
        // 6. Диспетчеризация
        this.dispatchComponentDidMount();
        // 8. Запуск рендера через EventBus
        this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }

    // 7. Монтирование компонента
    _componentDidMount(): void {
        this.componentDidMount(this.props as TProps);

        Object.values(this.children).forEach((child) => {
            if (Array.isArray(child)) {
                child.forEach(item => {
                    item.dispatchComponentDidMount();
                });
            }
        });
    }

    componentDidMount(props: TProps): void {/**/}

    // Диспетчеризация
    dispatchComponentDidMount(): void {
        this.eventBus().emit(Block.EVENTS.FLOW_CDM); // запуск монтирования через EventBus
    }

    // Обновление компонента
    _componentDidUpdate(oldProps: TProps, newProps: TProps): void {
        const response = this.componentDidUpdate(oldProps, newProps);
        if (response) {
            this._render();
        }
    }

    componentDidUpdate(oldProps: TProps, newProps: TProps): boolean {
        return true;
    }

    // Добавление событий
    _addEvents() {
        const events: Record<string, () => void> = (this.props as any).events;

        if (!events) {
            return;
        }

        Object.entries(events).forEach(([event, listener]) => {
            //this._element!.addEventListener(event, listener);
            this._element?.addEventListener(event, listener) ?? false;
        });
    }

    // Удаление событий
    _removeEvents() {
        const events: Record<string, () => void> = (this.props as any).events;

        if (!events || !this._element) {
            return;
        }

        Object.entries(events).forEach(([event, listener]) => {
            //this._element!.removeEventListener(event, listener);
            this._element?.removeEventListener(event, listener) ?? false;
        });
    }

    // Рендер компонента
    _render() {
        const fragment = this.render();
        //const newElement = fragment.firstElementChild!;
        const newElement = fragment.firstElementChild ? fragment.firstElementChild : "";
    
        this._removeEvents();
        //this._element!.replaceWith(newElement);
        this._element?.replaceWith(newElement) ?? false;
    
        this._element = newElement as HTMLElement;
        this._addEvents();
    }

    render(): DocumentFragment {
        return new DocumentFragment();
    }

    // Установка дополнительных пропсов
    setProps = (nextProps: TProps) => {

        if (!nextProps) {
            return;
        }

        const oldValue = { ...this.props };

        const { children, props } = this._getPropsAndChildren(nextProps);

        if (Object.values(children).length) {
            Object.assign(this.children, children);
        }
        if (Object.values(props).length) {
            Object.assign(this.props, props);
        }

        this.eventBus().emit(Block.EVENTS.FLOW_CDU, oldValue, this.props);
    };

    get element(): HTMLElement {
        return this._element ? this._element : this._createDocumentElement('div');
    }

    // Получение this._element
    getContent() {
        return this.element;
    }

    _getStubs(props: Record<string, any>) {
        const propsAndStubs: Record<string, any> = { ...props };
        Object.entries(this.children).forEach(([key, child]) => {
            if (Array.isArray(child)) {
                propsAndStubs[key] = [];
                child.forEach(item => {
                    propsAndStubs[key].push(`<div data-id="${item._id}"></div>`);
                });
            }
        });
        return propsAndStubs;
    }

    // Компиляция блока
    compile(template: string, props: Record<string, any>) {
        
        const propsAndStubs: Record<string, any> = this._getStubs(props);

        const fragment = document.createElement("template");
        const compiled = Handlebars.compile(template);

        fragment.innerHTML = compiled(propsAndStubs).trim();

        Object.values(this.children).forEach((child) => {
            if (Array.isArray(child)) {
                child.forEach(item => {
                    const fragmentContent = fragment.content; 
                    const stub = fragmentContent.querySelector(`[data-id="${item._id}"]`);
                    if (stub) {
                        const itemContent = item.getContent();
                        stub.replaceWith(itemContent);
                    }
                });
            }
        });

        return fragment.content;
    }

    // Отображение блока
    show() {
        if (this._element && this._element.hasAttribute('style')) {
            this._element.removeAttribute('style');
        }
    }

    // Скрытие блока
    hide() {
        if (this._element) {
            this._element.style.display = 'none';
        }
    }

}
