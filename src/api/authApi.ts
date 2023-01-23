import HTTPTransport from "../core/httpTransport";
import { API_PATH , API_ENDPOINTS } from "../utils/constants";
import { ResponseData, SignInRequestData, SignUpRequestData } from "./apiTypings";

class AuthApi extends HTTPTransport {
    constructor() {
        super()
    }

    public signUp = async (data: SignUpRequestData): Promise<ResponseData> => {
        return this.post(API_PATH + API_ENDPOINTS.auth.signUp, { data, headers: { "Content-Type": "application/json" } }) as Promise<ResponseData>;
    }

    public signIn = async (data: SignInRequestData): Promise<ResponseData> => {
        return this.post(API_PATH + API_ENDPOINTS.auth.signIn, { data, headers: { "Content-Type": "application/json" } }) as Promise<ResponseData>;
    }

    public getUserInfo = async () => {
        return this.get(API_PATH + API_ENDPOINTS.auth.user);
    }

    public logout = () => {
        return this.post(API_PATH + API_ENDPOINTS.auth.logout);
    }

}

export default AuthApi
