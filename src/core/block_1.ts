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

    //private _meta: { tagName: string; props: object; };

    public tagName: string;

    public eventBus: Function;

    public children: object;

    public props: Record<string, any> //Props;

    private _id: Nullable<string> = null;

    /** JSDoc
     * @param {string} tagName
     * @param {Object} propsAndChildren
     *
     * @returns {void}
     */
    constructor(tagName: string = 'div', propsAndChildren: Props) {
        // 1. Получение пропсов и детей
        const { children, props } = this._getPropsAndChildren(propsAndChildren);

        this.children = children;

        const eventBus = new EventBus();

        /*this._meta = {
            tagName,
            props,
        };*/
        this.tagName = tagName;

        this._id = makeUUID();
        // 2. Проксирование пропсов
        this.props = this._makePropsProxy({ ...props, __id: this._id });

        this.eventBus = () => eventBus;

        // 3. Регистрация событий
        this._registerEvents(eventBus);
        // 4. Запуск инциализации
        eventBus.emit(Block.EVENTS.INIT);
    }

    // 1. Получение пропсов и детей
    private _getPropsAndChildren(propsAndChildren: Props) {
        //console.log('1. Получение пропсов и детей - _getPropsAndChildren', propsAndChildren);
        const children: Record<string, any> = {};
        const props: Record<string, any> = {};

        Object.entries(propsAndChildren).forEach(([key, value]) => {
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
                props[key] = value;
            }
        });

        //console.log("   Children, Props: ", { children, props });

        return { children, props };
    }

    // 2. Проксирование пропсов
    private _makePropsProxy = (props: Record<string, any>) => {
        //console.log('2. Проксирование пропсов - _makePropsProxy');
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
        //console.log('3. Регистрация событий - _registerEvents');
        eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
        eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    }

    // 5. Создание элемента
    private _createResources(): void {
        //console.log('5. Создание элемента - _createResources');
        //const { tagName } = this._meta;
        this._element = document.createElement(this.tagName);
        //console.log("   this._element:", this._element);
    }

    // 4.1. Инициализация компонента
    init(): void {
        //console.log('4.1. Инициализация - init');
        this._createResources();
        // 6. Диспетчеризация
        //console.log('6. Диспетчеризация - dispatchComponentDidMount');
        this.dispatchComponentDidMount();
        // 8. Запуск рендера через EventBus
        //console.log('8. Запуск this._render через EventBus');
        this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
        //console.log('// ----------------------- END ----------------------- //');
    }

    // 7. Монтирование компонента
    private _componentDidMount(): void {
        //console.log('7. Монтирование - _componentDidMount');
        this.componentDidMount();

        Object.values(this.children).forEach((child) => {
            //console.log("child ----> ", child);
            if (Array.isArray(child)) {
                child.forEach(item => {
                    item.dispatchComponentDidMount();
                });
            }
        });
    }

    componentDidMount(): void {}

    // Диспетчеризация
    dispatchComponentDidMount(): void {
        //console.log('Диспетчеризация - dispatchComponentDidMount');
        this.eventBus().emit(Block.EVENTS.FLOW_CDM); // запуск монтирования через EventBus
    }

    // Обновление компонента
    private _componentDidUpdate(oldProps: Props, newProps: Props): void {
        //console.log('Обновление - _componentDidUpdate');
        const response = this.componentDidUpdate(oldProps, newProps);
        if (response) {
            this._render();
        }
    }

    componentDidUpdate(oldProps: Props, newProps: Props): boolean {
        //console.log('componentDidUpdate');
        return true;
    }

    // Добавление событий
    private _addEvents() {
        //console.log('_addEvents');
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

    // Добавление аттрибутов
    private _addAttributes() {
        //console.log('_addAttributes');
        const { attr = {} } = this.props;

        Object.keys(attr).forEach((attrName) => {
            if (this._element) {
                this._element.setAttribute(attrName, attr[attrName]);
            }
        });
    }

    // Удаление событий
    private _removeEvents() {
        //console.log('_removeEvents');
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

    // Рендер компонента
    private _render() : void {
        //console.log('Рендер - _render');
        const block = this.render();
        //console.log("-----------------------", block);

        this._removeEvents();
        this._element!.innerHTML = '';
        this._element!.appendChild(block);

        this._addAttributes();
        this._addEvents();
    }

    render(): DocumentFragment {
        //console.log('render');
        return undefined!;
    }

    // Установка дополнительных пропсов
    setProps = (nextProps: Props) => {
        //console.log('setProps');
        if (!nextProps) {
            return;
        }

        Object.assign(this.props, nextProps);
    };

    get element(): HTMLElement {
        //console.log('get element');
        return this._element!;
    }

    // Получение this._element
    getContent() {
        //console.log('getContent');
        return this.element;
    }

    // Компиляция блока
    compile(template: string, props: Record<string, any>) {
        //console.log('Компиляция блока и шаблонов с помощью Handlebars - compile');
        const propsAndStubs: Record<string, any> = { ...props };
        //console.log("   Пропсы и заглушки: ", propsAndStubs);

        const fragment = document.createElement("template");
        const compiled = Handlebars.compile(template);

        //console.log("   Children: ", this.children)
        Object.entries(this.children).forEach(([key, child]) => {
            //console.log("   Key, Child: ", key, child);
            if (Array.isArray(child)) {
                propsAndStubs[key] = [];
                child.forEach(item => {
                    propsAndStubs[key].push(`<div data-id="${item._id}"></div>`);
                });
            }
        });

        //console.log("   Пропсы и заглушки: ", propsAndStubs);

        fragment.innerHTML = compiled(propsAndStubs);

        Object.values(this.children).forEach((child) => {
            if (Array.isArray(child)) {
                child.forEach(item => {
                    const fragmentContent = fragment.content; 
                    const stub = fragmentContent.querySelector(`[data-id="${item._id}"]`);
                    stub!.replaceWith(item.getContent());
                });
            }
        });

        return fragment.content;
    }

    // Отображение блока
    show() {
        //console.log('show', this._element);
        this._element!.style.display = 'block';
    }

    // Скрытие блока
    hide() {
        //console.log('hide', this._element);
        this._element!.style.display = 'none';
    }

}

export default Block;
