import HTTPTransport from "./httpTransport";
import { API_ENDPOINTS } from "../../utils/constants";
import { TUserProfileData, TUserPasswordData, TUserLogin } from "../../types";

class UserAPI extends HTTPTransport {
    contentType = "application/json; charset=utf-8";

    /**
     * Изменение данных пользователя
     * @param {TUserProfileData} data 
     * @returns {Promise<XMLHttpRequest>}
     */
    public changeProfile(data: TUserProfileData): Promise<XMLHttpRequest> {
        console.info("UserAPI::changeProfile: ", data);
        return this.put(API_ENDPOINTS.users.changeProfile, { data: JSON.stringify(data), headers: { "Content-Type": this.contentType } });
    }

    /**
     * Изменение аватара пользователя
     * @param {FormData} data 
     * @returns {Promise<XMLHttpRequest>}
     */
    public changeAvatar(data: FormData): Promise<XMLHttpRequest> {
        console.info("UserAPI::changeAvatar: ", data);
        return this.put(API_ENDPOINTS.users.changeAvatar, { data });
        //return this.put(API_ENDPOINTS.users.changeAvatar, { data, headers: { "Content-Type": "multipart/form-data" } });
    }
    
    /**
     * Изменение пароля пользователя
     * @param {TUserPasswordData} data 
     * @returns {Promise<XMLHttpRequest>}
     */
    public changePassword(data: TUserPasswordData): Promise<XMLHttpRequest> {
        console.info("UserAPI::changePassword: ", data);
        return this.put(API_ENDPOINTS.users.changePassword, { data: JSON.stringify(data), headers: { "Content-Type": this.contentType } });
    }
    
    /**
     * Получение пользователя по id
     * @param {string} id 
     * @returns {Promise<XMLHttpRequest>}
     */
    public getUserById(id: string): Promise<XMLHttpRequest> {
        console.info("UserAPI::getUserById: ", id);
        return this.get(API_ENDPOINTS.users.getUserById(id));
    }

    /**
     * Поиск пользователя по логину
     * @param {TUserLogin} data
     * @returns {Promise<XMLHttpRequest>}
     */
    public searchUserByLogin(data: TUserLogin): Promise<XMLHttpRequest> {
        console.info("UserAPI::searchUserByLogin: ", data);
        return this.put(API_ENDPOINTS.users.searchUserByLogin, { data: JSON.stringify(data), headers: { "Content-Type": this.contentType } });
    }
}

export default UserAPI
