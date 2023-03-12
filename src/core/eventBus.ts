export default class EventBus {
    protected listeners: { [key: string]: any } = {};

    constructor() {
        this.listeners = {};
    }

    public on(event: string, callback: Function) {
        globalThis.DEBUG?.EventBus && globalThis.LOG && console.log("🚌➡️ EventBus.On:   ", event, callback);

        if (!this.listeners[event]) {
            this.listeners[event] = [];
        }

        this.listeners[event].push(callback);
    }

    public off(event: string, callback: Function) {
        globalThis.DEBUG?.EventBus && globalThis.LOG && console.log("🚌⬅️ EventBus.Off:  ", event, callback);

        if (!this.listeners[event]) {
            throw new Error(`Нет события: ${event}`);
        }

        this.listeners[event] = this.listeners[event].filter((listener: Function) => 
            listener !== callback
        );
    }

    public emit<T>(event: string, ...args: Array<T>) {
        globalThis.DEBUG?.EventBus && globalThis.LOG && console.log("🚌🔄 EventBus.Emit: ", event, ...args);

        if (!this.listeners[event]) {
            throw new Error(`Нет события: ${event}`);
        }

        globalThis.DEBUG?.EventBus && globalThis.LOG && console.log('🚌ℹ️ Listeners: ', this.listeners);

        this.listeners[event].forEach((listener: Function) => {
            listener(...args);
        });
    }
};
