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
            Router.getInstanse().go(ROUTES.chat.path);
        })
        .catch((err) => {
            console.log("SignUp error: ", err);
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
        .then((user: XMLHttpRequest) => {
            const userResponse = user.response;
            console.log("USER: ", userResponse);
            store.set("user", userResponse);
            console.log("store", store.getState());
            Router.getInstanse().go(ROUTES.profile.path);
        })
        .catch((error) => {
            console.log("SignIn error: ", error);
        });
    }

    static async checkUser() {
        return authAPI.getUserInfo()
        .then((res: XMLHttpRequest) => {
            console.log("USER: ", res);
            return res;
        })
        .catch((err) => {
            console.log(`Check user error: ${err.statusText}, ${err.status}`);
            return err;
        });
    }

    static async getUserInfo() {
        const { user } = store.getState();
        if (user) {
            console.log("user from store", user);
            return Promise.resolve(user);
        }
        
        return authAPI.getUserInfo()
        .then((user: XMLHttpRequest) => {
            const userResponse = user.response;
            console.log("USER: ", userResponse);
            store.set("user", userResponse);
            return user;
        })
        .catch((err) => {
            console.log(`Get user error: ${err.statusText}, ${err.status}`);
            return err;
        });
    }

    static async logout() {
        return authAPI.logout()
        .then(() => {
            Router.getInstanse().go(ROUTES.home.path);
        })
        .catch((err) => {
            console.log("Logout error: ", err);
        });
    }

}

export default AuthController
