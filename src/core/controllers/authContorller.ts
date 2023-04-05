// Core
import { store } from "@core/store";
import Router from "@core/router";
import AuthAPI from "@core/api/authApi";
// Utils
import formDataToObjectConverter from "@utils/formDataToObjectConverter";
import { ROUTES } from "@utils/constants";
// Types
import { TSignInData, TSignUpData } from "@custom_types/index";

const authAPI = new AuthAPI();

class AuthController {

    static async signUp(formData: FormData) {
        const data = formDataToObjectConverter(formData) as TSignUpData;
        return authAPI.signUp(data)
        .then(() => {
            return authAPI.getUserInfo();
        })
        .then((response) => {
            store.set("user", response.response);
            return response;
        })
        .catch((error) => {
            return error;
        });
    }

    static async signIn(formData: FormData) {
        const data = formDataToObjectConverter(formData) as TSignInData;
        return authAPI.signIn(data)
        .then(() => {
            return authAPI.getUserInfo();
        })
        .then((response) => {
            store.set("user", response.response);
            return response;
        })
        .catch((error) => {
            return error;
        });
    }

    static async checkUser() {
        return authAPI.getUserInfo()
        .then((response) => {
            return response;
        })
        .catch((error) => {
            return error;
        });
    }

    static async getUserInfo() {    
        return authAPI.getUserInfo()
        .then((response) => {
            store.set("user", response.response);
            return response;
        })
        .catch((error) => {
            return error;
        });
    }

    static async logout() {
        return authAPI.logout()
        .then(() => {
            Router.getInstanse().go(ROUTES.home.path);
            const { user } = store.getState();
            if (user) {
                store.clear();
            }
        })
        .catch((error) => {
            return error;
        });
    }

}

export default AuthController
