import EventBus from '../eventBus';
import set from '../../utils/set';

type Indexed = Record<string, any>;

export const StoreEvents = {
  Updated: 'updated',
};

class Store extends EventBus {
  private state: Indexed = {};

  public getState() {
    globalThis.DEBUG?.Store && globalThis.LOG && console.log("🫙 STORE: ", this.state);
    return this.state;
  }

  public set(path: string, value: unknown) {
    set(this.state, path, value);

    // метод EventBus
    this.emit(StoreEvents.Updated);
  }

  public delete(key: string) {
    if (this.state.key) {
      delete this.state[`${key}`];
    }

    // метод EventBus
    this.emit(StoreEvents.Updated);
  }

  public clear() {
    this.state = {};

    // метод EventBus
    this.emit(StoreEvents.Updated);
  }


}

export const store = new Store();
