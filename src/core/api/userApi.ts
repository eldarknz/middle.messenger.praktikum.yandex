import HTTPTransport from "./httpTransport";
import { API_ENDPOINTS } from "../../utils/constants";
import { TUserProfileData, TUserPasswordData, TUserLogin } from "../../types";

class UserAPI extends HTTPTransport {
    contentType = "application/json; charset=utf-8";

    public changeProfile(data: TUserProfileData) {
        console.log("changeProfile: ", data);
        return this.put(API_ENDPOINTS.users.changeProfile, { data: JSON.stringify(data), headers: { "Content-Type": this.contentType } });
    }

    public changeAvatar(data: FormData) {
        console.log("changeAvatar: ", data);
        return this.put(API_ENDPOINTS.users.changeAvatar, { data }); //headers: { "Content-Type": "multipart/form-data" } });
    }
    
    public changePassword(data: TUserPasswordData) {
        console.log("changePassword: ", data);
        return this.put(API_ENDPOINTS.users.changePassword, { data: JSON.stringify(data), headers: { "Content-Type": this.contentType } });
      }
    
    public getUserById(id: string) {
        console.log("getUserById: ", id);
        return this.get(API_ENDPOINTS.users.getUserById(id));
    }

    public searchUserByLogin(data: TUserLogin) {
        console.log("searchUserByLogin: ", data);
        return this.put(API_ENDPOINTS.users.searchUserByLogin, { data: JSON.stringify(data), headers: { "Content-Type": this.contentType } });
    }
}

export default UserAPI
