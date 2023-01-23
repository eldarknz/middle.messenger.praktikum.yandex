import { userReducer } from './reducers/user';
import { Store } from './../core/store';
import Block from './../core/block';


export const store = new Store({
    userReducer,
});


export function connect(stateToProps: (state: any) => any, Component: typeof Block) {
    return class WithStore extends Component {
        constructor(props: any) {
            super({...props, ...stateToProps(store.getState())});
        }

        componentDidMount(props: any) {
            super.componentDidMount(props);

            store.on('changed', () => {
                this.setProps({
                    ...this.props,
                    ...stateToProps(store.getState())
                });
            });
        }
    };
}
