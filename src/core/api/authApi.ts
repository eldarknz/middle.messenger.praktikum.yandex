import HTTPTransport from "./httpTransport";
import { API_ENDPOINTS } from "../../utils/constants";
import { TSignUpData, TSignInData } from "../../types";

class AuthAPI extends HTTPTransport {
    contentType = "application/json; charset=utf-8";

    /**
     * регистрация пользователя
     * @param {TSignUpData} data 
     * @returns {Promise<XMLHttpRequest>}
     */
    public signUp(data: TSignUpData): Promise<XMLHttpRequest> {
        globalThis.DEBUG?.AuthAPI && globalThis.LOG && console.info("AuthAPI::signUp: ", data);
        return this.post(API_ENDPOINTS.auth.signUp, { data: JSON.stringify(data), headers: { "Content-Type": this.contentType } });
    }

    /**
     * Авторизация пользователя
     * @param {TSignInData} data 
     * @returns {Promise<XMLHttpRequest>}
     */
    public signIn(data: TSignInData): Promise<XMLHttpRequest> {
        globalThis.DEBUG?.AuthAPI && globalThis.LOG && console.info("AuthAPI::signIn: ", data);
        return this.post(API_ENDPOINTS.auth.signIn, { data: JSON.stringify(data), headers: { "Content-Type": this.contentType } });
    }

    /**
     * Получение информации пользователя
     * @returns {Promise<XMLHttpRequest>}
     */
    public getUserInfo(): Promise<XMLHttpRequest> {
        globalThis.DEBUG?.AuthAPI && globalThis.LOG && console.info("AuthAPI::getUserInfo");
        return this.get(API_ENDPOINTS.auth.user);
    }

    /**
     * Выход из системы
     * @returns {Promise<XMLHttpRequest>}
     */
    public logout(): Promise<XMLHttpRequest> {
        globalThis.DEBUG?.AuthAPI && globalThis.LOG && console.info("AuthAPI::logout");
        return this.post(API_ENDPOINTS.auth.logout);
    }
}

export default AuthAPI
