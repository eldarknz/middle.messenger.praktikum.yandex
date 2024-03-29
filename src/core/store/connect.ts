// Core
import { Block } from '@core/block';
import { isEqual } from '@utils/isEqual';
import { store, StoreEvents, TState } from '.';
// Utils

export function connect(mapStateToProps: (state: TState) => any) {
    return function (Component: typeof Block) {
        return class extends Component {
            constructor(props: Record<string, unknown>) {
                // сохраняем начальное состояние
                let state = mapStateToProps(store.getState());
                super({ ...props, ...state });

                // подписываемся на событие
                store.on(StoreEvents.Updated, () => {
                    // при обновлении получаем новое состояние
                    const newState = mapStateToProps(store.getState());

                    // если что-то из используемых данных поменялось, обновляем компонент
                    if (!isEqual(state, newState)) {
                        this.setProps({ ...newState });
                    }

                    // не забываем сохранить новое состояние
                    state = newState;
                });
            }
        };
    };
}
