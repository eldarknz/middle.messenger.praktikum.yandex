import EventBus from "../core/eventBus";
import Block from "../core/block";

/*export enum StoreEvents {
    Updated = 'updated',
}

class Store extends EventBus{
    private state: Indexed = {};
  
    public getState() {
      return state;
    }
  
    public set(path: string, value: unknown) {
      set(this.state, path, value);

      this.emit(StoreEvents.Updated)
    };
}

//const state = {};

//set(state, 'user.name', 'John'); 
//console.log(state); // { user: { name: 'John' } }

//import store, { StoreEvents } from './store';

class UserProfile extends Block {
  constructor(...args) {
    super(...args);

        // запрашиваем данные у контроллера
        UserController.getUser();

        // подписываемся на событие
    store.on(StoreEvents.Updated, () => {
      // вызываем обновление компонента, передав данные из хранилища
      this.setProps(store.getState());
        });
  }

  render() {
    // внутри рендер в this.props будут достпны данные из хранилища
  }
}*/
