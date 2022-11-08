export type Listener<T extends unknown[] = any[]> = (...args: T) => void;

export default class EventBus<
    E extends string = string,
    M extends { [K in E]: unknown[] } = Record<E, any[]>
> {
    private listeners: { [key in E]?: Listener<M[E]>[] } = {};

    public on(event: E, callback: Listener<M[E]>) {
        if (!this.listeners[event]) {
            this.listeners[event] = [];
        }

        this.listeners[event]!.push(callback);
    }

    public off(event: E, callback: Listener<M[E]>) {
        if (!this.listeners[event]) {
            throw new Error(`Нет события: ${event}`);
        }

        this.listeners[event] = this.listeners[event]!.filter(
            listener => listener !== callback
        );
    }

    public emit(event: E, ...args: M[E]) {
        if (!this.listeners[event]) {
            return;
            // throw new Error(`Нет события: ${event}`);
        }

        this.listeners[event]!.forEach(function (listener) {
            listener(...args);
        });
    }
}
/*export default class EventBus {
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
            listener => listener !== callback
        );
    }

    public emit<T>(event: string, ...args: Array<T>) {
        if (!this.listeners[event]) {
            throw new Error(`Нет события: ${event}`);
        }

        this.listeners[event].forEach(listener => {
            listener(...args);
        });
    }
};*/