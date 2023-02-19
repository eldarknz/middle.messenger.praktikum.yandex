import HTTPTransport from "./httpTransport";
import { API_ENDPOINTS } from "../../utils/constants";
import { TSignUpData, TSignInData } from "../../types";

class AuthAPI extends HTTPTransport {
    contentType = "application/json; charset=utf-8";

    public signUp = async (data: TSignUpData) => {
        console.log("signUp: ", data);
        return this.post(API_ENDPOINTS.auth.signUp, { data: JSON.stringify(data), headers: { "Content-Type": this.contentType } });
    }

    public signIn = async (data: TSignInData) => {
        console.log("signIn: ", data);
        return this.post(API_ENDPOINTS.auth.signIn, { data: JSON.stringify(data), headers: { "Content-Type": this.contentType } });
    }

    public getUserInfo = async () => {
        console.log("getUserInfo");
        return this.get(API_ENDPOINTS.auth.user);
    }

    public logout = async () => {
        console.log("logout");
        return this.post(API_ENDPOINTS.auth.logout);
    }
}

export default AuthAPI
