export class EventBus {
    protected listeners: { [key: string]: any } = {};

    constructor() {
        this.listeners = {};
    }

    public on(event: string, callback: Function) {
        if (!this.listeners[event]) {
            this.listeners[event] = [];
        }

        this.listeners[event].push(callback);
    }

    public off(event: string, callback: Function) {
        if (!this.listeners[event]) {
            throw new Error(`Нет события: ${event}`);
        }

        this.listeners[event] = this.listeners[event].filter(
            (listener: Function) => listener !== callback
        );
    }

    public emit<T>(event: string, ...args: Array<T>) {
        if (!this.listeners[event]) {
            throw new Error(`Нет события: ${event}`);
        }

        this.listeners[event].forEach((listener: Function) => {
            listener(...args);
        });
    }
}
