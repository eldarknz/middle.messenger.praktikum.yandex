import AuthAPI from "../api/authApi";
import { store } from "../store";
import { TSignInData, TSignUpData } from "../../types";
import formDataToObjectConverter from "../../utils/formDataToObjectConverter";
import Router from "../router";
import { ROUTES } from "../../utils/constants";

const authAPI = new AuthAPI();

class AuthController {

    static async signUp(formData: FormData) {
        globalThis.DEBUG?.AuthController&& globalThis.LOG && console.info("AuthController::signUp");
        const data = formDataToObjectConverter(formData) as TSignUpData;

        globalThis.DEBUG?.AuthController&& globalThis.LOG && console.log("SignUpData: ", data);

        return authAPI.signUp(data)
        .then((response) => {
            globalThis.DEBUG?.AuthController&& globalThis.LOG && console.log("SignUp RESPONSE: ", response);
            return authAPI.getUserInfo();
        })
        .then((response) => {
            const userResponse = response.response;
            globalThis.DEBUG?.AuthController&& globalThis.LOG && console.log("SignUp USER: ", userResponse);
            store.set("user", userResponse);
            return response;
        })
        .catch((error) => {
            globalThis.DEBUG?.AuthController&& globalThis.LOG && console.log("SignUp error: ", error);
            return error;
        });
    }

    static async signIn(formData: FormData) {
        globalThis.DEBUG?.AuthController&& globalThis.LOG && console.info("AuthController::signIn");
        const data = formDataToObjectConverter(formData) as TSignInData;

        globalThis.DEBUG?.AuthController&& globalThis.LOG && console.log("SignInData: ", data);

        return authAPI.signIn(data)
        .then(response => {
            globalThis.DEBUG?.AuthController&& globalThis.LOG && console.log("SignIn RESPONSE: ", response);
            return authAPI.getUserInfo();
        })
        .then((response) => {
            const userResponse = response.response;
            globalThis.DEBUG?.AuthController&& globalThis.LOG && console.log("SignIn USER: ", userResponse);
            store.set("user", userResponse);
            return response;
        })
        .catch((error) => {
            globalThis.DEBUG?.AuthController&& globalThis.LOG && console.log('SignIn error: ', error);
            return error;
        });
    }

    static async checkUser() {
        globalThis.DEBUG?.AuthController&& globalThis.LOG && console.info("AuthController::checkUser");
        return authAPI.getUserInfo()
        .then((response) => {
            globalThis.DEBUG?.AuthController&& globalThis.LOG && console.log("AuthController::checkUser USER: ", response);
            return response;
        })
        .catch((error) => {
            globalThis.DEBUG?.AuthController&& globalThis.LOG && console.log("Check user error: ", error);
            return error;
        });
    }

    static async getUserInfo() {
        globalThis.DEBUG?.AuthController&& globalThis.LOG && console.info("AuthController::getUserInfo");        
        return authAPI.getUserInfo()
        .then((response) => {
            const userResponse = response.response;
            globalThis.DEBUG?.AuthController&& globalThis.LOG && console.log("AuthController::getUserInfo USER: ", userResponse);
            store.set("user", userResponse);
            return response;
        })
        .catch((error) => {
            globalThis.DEBUG?.AuthController&& globalThis.LOG && console.log("Get user error: ", error);
            return error;
        });
    }

    static async logout() {
        globalThis.DEBUG?.AuthController&& globalThis.LOG && console.info("AuthController::logout");
        return authAPI.logout()
        .then(() => {
            Router.getInstanse().go(ROUTES.home.path);
            const { user } = store.getState();
            if (user) {
                store.clear();
            }
        })
        .catch((error) => {
            globalThis.DEBUG?.AuthController&& globalThis.LOG && console.log("Logout error: ", error);
        });
    }

}

export default AuthController
