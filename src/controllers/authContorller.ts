import AuthApi from '../api/authApi';
import { store } from '../services';
import { SignInRequestData, SignUpRequestData, UserRequestData } from '../api/apiTypings';
//import {deleteUser, setError, setUser} from '../store/user';
import { setUser, deleteUser, setError } from '../services/actions/user';

class AuthController {
    private api: AuthApi;

    constructor() {
        this.api = new AuthApi()
    }

    async signup(data: SignUpRequestData) {
        try {
            await this.api.signUp(data);
            await this.fetchUser();
        } catch (e) {
            store.dispatch(setError(e as { reason: string }));
        }
    }

    async login(data: SignInRequestData) {
        try {
            await this.api.signIn(data);
            await this.fetchUser();
        } catch (e) {
            store.dispatch(setError(e as { reason: string }));
        }
    }

    async logout() {
        try {
            await this.api.logout();

            store.dispatch(deleteUser());
        } catch (e) {
            store.dispatch(setError(e as { reason: string }));
        }
    }

    async fetchUser(): Promise<UserRequestData | void> {
        try {
            console.log('aaa');
            const user: any = await this.api.getUserInfo();

            store.dispatch(setUser(user));

            return user;
        } catch (e) {
            store.dispatch(deleteUser());
        }
    }
}

export default AuthController;
