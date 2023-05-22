export class EventBus {
    protected listeners: Record<string, ((...args: any) => void)[]>;

    constructor() {
        this.listeners = {};
    }

    public on(event: string, callback: (...args: any) => void) {
        if (!this.listeners[event]) {
            this.listeners[event] = [];
        }

        this.listeners[event].push(callback);
    }

    public off(event: string, callback: (...args: any) => void) {
        if (!this.listeners[event]) {
            throw new Error(`Нет события: ${event}`);
        }

        this.listeners[event] = this.listeners[event].filter(
            (listener) => listener !== callback
        );
    }

    public emit<T>(event: string, ...args: Array<T>) {
        if (!this.listeners[event]) {
            throw new Error(`Нет события: ${event}`);
        }

        this.listeners[event].forEach((listener) => {
            listener(...args);
        });
    }
}
