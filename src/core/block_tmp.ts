import Handlebars from "handlebars";
import EventBus from "./eventBus";
import { v4 as makeUUID } from 'uuid';

class Block {
    static EVENTS = {
        INIT: 'init',
        FLOW_CDM: 'flow:component-did-mount',
        FLOW_CDU: 'flow:component-did-update',
        FLOW_RENDER: 'flow:render',
    } as const;

    private _element: Nullable<HTMLElement> = null;
    private _meta = null;

    public constructor(props?) {
        this.props = this._makePropsProxy(props || {});

        this._eventBus = new EventBus<Events>();

        this._registerEvents(this._eventBus);
    
        this._eventBus.emit(Block.EVENTS.INIT, this.props);
    }

    // Регистрация событий
    _registerEvents(eventBus) {
        eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
        eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
    }
}

export default Block