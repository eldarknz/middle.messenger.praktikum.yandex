import AuthAPI from "../api/authApi";
import { store } from "../store";
import { TSignInData, TSignUpData } from "../../types";
import formDataToObjectConverter from "../../utils/formDataToObjectConverter";
import Router from "../router";
import { ROUTES } from "../../utils/constants";

const authAPI = new AuthAPI();

class AuthController {

    static async signUp(formData: FormData) {
        const data = formDataToObjectConverter(formData) as TSignUpData;

        console.log("SignUpData: ", data);

        return authAPI.signUp(data)
        .then((response) => {
            console.log("RESPONSE: ", response);
            //Router.getInstanse().go(ROUTES.chat.path);
            //return response;
            return authAPI.getUserInfo();
        })
        .then((response: XMLHttpRequest) => {
            const userResponse = response.response;
            console.log("USER: ", userResponse);
            store.set("user", userResponse);
            console.log("store", store.getState());
            //Router.getInstanse().go(ROUTES.chat.path);
            return response;
        })
        .catch((error) => {
            console.log("SignUp error: ", error);
            return error;
        });
    }

    static async signIn(formData: FormData) {
        const data = formDataToObjectConverter(formData) as TSignInData;

        console.log("SignInData: ", data);

        return authAPI.signIn(data)
        .then(response => {
            console.log("RESPONSE: ", response);
            return authAPI.getUserInfo();
        })
        .then((response: XMLHttpRequest) => {
            const userResponse = response.response;
            console.log("USER: ", userResponse);
            store.set("user", userResponse);
            console.log("store", store.getState());
            //Router.getInstanse().go(ROUTES.chat.path);
            return response;
        })
        .catch((error) => {
            console.log('SignIn error: ', error);
            return error;
        });
    }

    static async checkUser() {
        return authAPI.getUserInfo()
        .then((response: XMLHttpRequest) => {
            console.log("USER: ", response);
            return response;
        })
        .catch((error) => {
            console.log(`Check user error: ${error.statusText}, ${error.status}`);
            return error;
        });
    }

    static async getUserInfo() {
        const { user } = store.getState();
        if (user) {
            console.log("user from store", user);
            return Promise.resolve(user);
        }
        
        return authAPI.getUserInfo()
        .then((response: XMLHttpRequest) => {
            const userResponse = response.response;
            console.log("USER: ", userResponse);
            store.set("user", userResponse);
            return response;
        })
        .catch((error) => {
            console.log(`Get user error: ${error.statusText}, ${error.status}`);
            return error;
        });
    }

    static async logout() {
        return authAPI.logout()
        .then(() => {
            const { user } = store.getState();
            if (user) {
                store.clear();
            }
            Router.getInstanse().go(ROUTES.home.path);
        })
        .catch((error) => {
            console.log("Logout error: ", error);
        });
    }

}

export default AuthController
