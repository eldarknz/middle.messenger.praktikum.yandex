import Block from "../block";
import isEqual from "../../utils/isEqual";
import { store, StoreEvents } from ".";

export type Indexed<T = unknown> = {
    [key in string]: T;
};

function connect(mapStateToProps: (state: any) => any) {
    return function (Component: typeof Block) {
        return class extends Component {
            constructor(props: {}) {
                // сохраняем начальное состояние
                let state = mapStateToProps(store.getState());
                console.log(state);
                super({ ...props, ...state });

                // подписываемся на событие
                store.on(StoreEvents.Updated, () => {
                    // при обновлении получаем новое состояние
                    const newState = mapStateToProps(store.getState());

                    // если что-то из используемых данных поменялось, обновляем компонент
                    if (!isEqual(state, newState)) {
                        console.log({ ...newState })
                        this.setProps({ ...newState });
                    }

                    // не забываем сохранить новое состояние
                    state = newState;
                });
            }
        };
    };
}

export default connect
