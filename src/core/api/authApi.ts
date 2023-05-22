// Core
// Utils
import { API_ENDPOINTS } from '@utils/constants';
// Types
import { TSignUpData, TSignInData } from '@custom_types/index';
import { HTTPTransport } from './httpTransport';

export class AuthAPI extends HTTPTransport {
    contentType = 'application/json; charset=utf-8';

    /**
     * регистрация пользователя
     * @param {TSignUpData} data
     * @returns {Promise<XMLHttpRequest>}
     */
    public signUp(data: TSignUpData): Promise<XMLHttpRequest> {
        return this.post(API_ENDPOINTS.auth.signUp, {
            data: JSON.stringify(data),
            headers: { 'Content-Type': this.contentType },
        });
    }

    /**
     * Авторизация пользователя
     * @param {TSignInData} data
     * @returns {Promise<XMLHttpRequest>}
     */
    public signIn(data: TSignInData): Promise<XMLHttpRequest> {
        return this.post(API_ENDPOINTS.auth.signIn, {
            data: JSON.stringify(data),
            headers: { 'Content-Type': this.contentType },
        });
    }

    /**
     * Получение информации пользователя
     * @returns {Promise<XMLHttpRequest>}
     */
    public getUserInfo(): Promise<XMLHttpRequest> {
        return this.get(API_ENDPOINTS.auth.user);
    }

    /**
     * Выход из системы
     * @returns {Promise<XMLHttpRequest>}
     */
    public logout(): Promise<XMLHttpRequest> {
        return this.post(API_ENDPOINTS.auth.logout);
    }
}
