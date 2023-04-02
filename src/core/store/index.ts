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

  public delete(value: string | string[]) {
    if (value instanceof Array) {
      value.forEach(item => {
        if (item in this.state) {
          delete this.state[`${item}`];
        }
      });
    } else {
      if (value in this.state) {
        delete this.state[`${value}`];
      }
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
