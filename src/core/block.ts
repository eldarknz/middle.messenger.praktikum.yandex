import Handlebars from 'handlebars';
import { v4 as makeUUID } from 'uuid';
import EventBus from './eventBus';

export type Children = Record<string, any>;

//class Block<Props extends Record<string, any> = any> {
class Block {
    static EVENTS = {
        INIT: 'init',
        FLOW_CDM: 'flow:component-did-mount',
        FLOW_CDU: 'flow:component-did-update',
        FLOW_RENDER: 'flow:render',
    };

    private _element: Nullable<HTMLElement> = null;

    private _id: Nullable<string> = null;

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
    private _getPropsAndChildren(propsAndChildren: TProps) {
        globalThis.DEBUG?.Block && globalThis.LOG && console.log('1. Получение пропсов и детей - _getPropsAndChildren', propsAndChildren);
        const children: { [key: string]: any } = {};
        const props: TProps = {} as TProps;

        Object.entries(propsAndChildren).forEach(([key, value]) => {
            globalThis.DEBUG?.Block && globalThis.LOG && console.log(key, value);
            if (value instanceof Block) {
                children[key] = [value];
            } else if (Array.isArray(value)) {
                value.forEach(item => {
                    if (item instanceof Block) {
                        if (!children.hasOwnProperty(key)) {
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

        globalThis.DEBUG?.Block && globalThis.LOG && console.log("   Children, TProps: ", { children, props });

        return { children, props };
    }

    // 2. Проксирование пропсов
    private _makePropsProxy = (props: TProps) => {
        globalThis.DEBUG?.Block && globalThis.LOG && console.log('2. Проксирование пропсов - _makePropsProxy');
        globalThis.DEBUG?.Block && globalThis.LOG && console.log("   TProps:", props);
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
    private _registerEvents(eventBus: EventBus): void {
        globalThis.DEBUG?.Block && globalThis.LOG && console.log('3. Регистрация событий - _registerEvents');
        eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
        eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    }

    _createDocumentElement(tagName: string) {
        return document.createElement(tagName);
    }

    // 5. Создание элемента
    private _createResources(): void {
        globalThis.DEBUG?.Block && globalThis.LOG && console.log('5. Создание элемента - _createResources');
        this._element = this._createDocumentElement('div');
        globalThis.DEBUG?.Block && globalThis.LOG && console.log("   this._element:", this._element);
    }

    // 4.1. Инициализация компонента
    init(): void {
        globalThis.DEBUG?.Block && globalThis.LOG && console.log('4.1. Инициализация - init');
        this._createResources();
        // 6. Диспетчеризация
        globalThis.DEBUG?.Block && globalThis.LOG && console.log('6. Диспетчеризация - dispatchComponentDidMount');
        this.dispatchComponentDidMount();
        // 8. Запуск рендера через EventBus
        globalThis.DEBUG?.Block && globalThis.LOG && console.log('8. Запуск this._render через EventBus');
        this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
        globalThis.DEBUG?.Block && globalThis.LOG && console.log('// ----------------------- END ----------------------- //');
    }

    // 7. Монтирование компонента
    private _componentDidMount(): void {
        globalThis.DEBUG?.Block && globalThis.LOG && console.log('7. Монтирование - _componentDidMount');
        this.componentDidMount(this.props as TProps);

        Object.values(this.children).forEach((child) => {
            globalThis.DEBUG?.Block && globalThis.LOG && console.log("child ----> ", child);
            if (Array.isArray(child)) {
                child.forEach(item => {
                    item.dispatchComponentDidMount();
                });
            }
        });
    }

    componentDidMount(props: TProps): void {}

    // Диспетчеризация
    dispatchComponentDidMount(): void {
        globalThis.DEBUG?.Block && globalThis.LOG && console.log('Диспетчеризация - dispatchComponentDidMount');
        this.eventBus().emit(Block.EVENTS.FLOW_CDM); // запуск монтирования через EventBus
    }

    // Обновление компонента
    private _componentDidUpdate(oldProps: TProps, newProps: TProps): void {
        globalThis.DEBUG?.Block && globalThis.LOG && console.log('Обновление - _componentDidUpdate');
        const response = this.componentDidUpdate(oldProps, newProps);
        if (response) {
            this._render();
        }
    }

    componentDidUpdate(oldProps: TProps, newProps: TProps): boolean {
        globalThis.DEBUG?.Block && globalThis.LOG && console.log('componentDidUpdate');
        return true;
    }

    // Добавление событий
    private _addEvents() {
        globalThis.DEBUG?.Block && globalThis.LOG && console.log('_addEvents');
        //const { events = {} } = this.props;
        const events: Record<string, () => void> = (this.props as any).events;

        if (!events) {
            return;
        }

        Object.entries(events).forEach(([event, listener]) => {
            this._element!.addEventListener(event, listener);
        });

        /*Object.keys(events).forEach((eventName) => {
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
        });*/
    }

    // Удаление событий
    private _removeEvents() {
        globalThis.DEBUG?.Block && globalThis.LOG && console.log('_removeEvents');
        //const { events = {} } = this.props;
        const events: Record<string, () => void> = (this.props as any).events;

        if (!events || !this._element) {
            return;
        }

        Object.entries(events).forEach(([event, listener]) => {
            this._element!.removeEventListener(event, listener);
        });

        /*Object.keys(events).forEach((eventName) => {
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
        });*/
    }

    // Рендер компонента
    private _render() {
        globalThis.DEBUG?.Block && globalThis.LOG && console.log('Рендер - _render');

        const fragment = this.render();
        const newElement = fragment.firstElementChild!;
    
        this._removeEvents();
        this._element!.replaceWith(newElement);
    
        this._element = newElement as HTMLElement;
        globalThis.DEBUG?.Block && globalThis.LOG && console.log(this._element);
        this._addEvents();
    }

    /*private _render() : void {
        globalThis.DEBUG?.Block && globalThis.LOG && console.log('Рендер - _render');

        const fragment = this.render();

        this._removeEvents();
        const newElement = fragment.firstElementChild!;

        globalThis.DEBUG?.Block && globalThis.LOG && console.log("-----------------------", newElement);

        this._element = newElement as HTMLElement;
        //this._removeEvents();
        //this._element!.innerHTML = '';
        //this._element!.appendChild(block);

        globalThis.DEBUG?.Block && globalThis.LOG && console.log(this._element);
        //this._addAttributes();
        //this._addEvents();
    }*/

    render(): DocumentFragment {
        globalThis.DEBUG?.Block && globalThis.LOG && console.log('render');
        return undefined!;
    }

    // Установка дополнительных пропсов
    setProps = (nextProps: TProps) => {
        globalThis.DEBUG?.Block && globalThis.LOG && console.log('setProps');
        globalThis.DEBUG?.Block && globalThis.LOG && console.log(nextProps);

        if (!nextProps) {
            return;
        }

        const oldValue = { ...this.props };

        const { children, props } = this._getPropsAndChildren(nextProps);

        globalThis.DEBUG?.Block && globalThis.LOG && console.log("CHILDREN: ", children);
        globalThis.DEBUG?.Block && globalThis.LOG && console.log("PROPS: ", props);

        if (Object.values(children).length) {
            Object.assign(this.children, children);
        }
        if (Object.values(props).length) {
            Object.assign(this.props, props);
        }

        this.eventBus().emit(Block.EVENTS.FLOW_CDU, oldValue, this.props);
        //Object.assign(this.props, nextProps);
    };

    get element(): HTMLElement {
        globalThis.DEBUG?.Block && globalThis.LOG && console.log('get element');
        return this._element!;
    }

    // Получение this._element
    getContent() {
        globalThis.DEBUG?.Block && globalThis.LOG && console.log('getContent');
        globalThis.DEBUG?.Block && globalThis.LOG && console.log(this.element);
        //const temp = document.createElement('div');
        //temp.innerHTML = blockContent.trim();
        //const htmlObject = temp.firstChild;
        //globalThis.DEBUG?.Block && globalThis.LOG && console.log(htmlObject);
        return this.element;
    }

    private _getStubs(props: Record<string, any>) {
        globalThis.DEBUG?.Block && globalThis.LOG && console.log("   Children: ", this.children)
        const propsAndStubs: Record<string, any> = { ...props };
        Object.entries(this.children).forEach(([key, child]) => {
            globalThis.DEBUG?.Block && globalThis.LOG && console.log("   Key, Child: ", key, child);
            if (Array.isArray(child)) {
                propsAndStubs[key] = [];
                child.forEach(item => {
                    propsAndStubs[key].push(`<div data-id="${item._id}"></div>`);
                });
            }
        });
        globalThis.DEBUG?.Block && globalThis.LOG && console.log("   Пропсы и заглушки: ", propsAndStubs);
        return propsAndStubs;
    }

    // Компиляция блока
    compile(template: string, props: Record<string, any>) {
        globalThis.DEBUG?.Block && globalThis.LOG && console.log('Компиляция блока и шаблонов с помощью Handlebars - compile');
        
        const propsAndStubs: Record<string, any> = this._getStubs(props);

        const fragment = document.createElement("template");
        const compiled = Handlebars.compile(template);

        fragment.innerHTML = compiled(propsAndStubs).trim();

        Object.values(this.children).forEach((child) => {
            globalThis.DEBUG?.Block && globalThis.LOG && console.log(this.children);
            if (Array.isArray(child)) {
                child.forEach(item => {
                    const fragmentContent = fragment.content; 
                    const stub = fragmentContent.querySelector(`[data-id="${item._id}"]`);
                    if (stub) {
                        const itemContent = item.getContent();
                        globalThis.DEBUG?.Block && globalThis.LOG && console.log("    ", fragmentContent, itemContent);
                        stub.replaceWith(itemContent);
                    }
                });
            }
        });

        return fragment.content;
    }

    // Отображение блока
    show() {
        globalThis.DEBUG?.Block && globalThis.LOG && console.log('show', this._element);
        if (this._element && this._element.hasAttribute('style')) {
            this._element.removeAttribute('style');
        }
        //this._element!.style.display = 'block';

    }

    // Скрытие блока
    hide() {
        globalThis.DEBUG?.Block && globalThis.LOG && console.log('hide', this._element);
        this._element!.style.display = 'none';
    }

}

export default Block;
