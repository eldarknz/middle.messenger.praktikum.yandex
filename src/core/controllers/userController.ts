import UserAPI from "../api/userApi";
import { store } from "../store";
import { TUserProfileData, TUserPasswordData, TUserPasswordFormData } from "../../types";
import formDataToObjectConverter from "../../utils/formDataToObjectConverter";
//import Router from "../router";
//import { ROUTES } from "../../utils/constants";

const preparePassword = (data: TUserPasswordFormData): TUserPasswordData => {
    return {
        newPassword: data["new_password"] ?? "",
        oldPassword: data["password"] ?? "",
    };
}

const userAPI = new UserAPI();

class UserController {

    static async changeProfile(formData: FormData) {
        globalThis.DEBUG?.UserController && globalThis.LOG && console.info("UserController::changeProfile");
        const data = formDataToObjectConverter(formData) as TUserProfileData;

        globalThis.DEBUG?.UserController && globalThis.LOG && console.log("ChangeProfile: ", data);

        return userAPI.changeProfile(data)
        .then((response) => {
            const userResponse = response.response;
            globalThis.DEBUG?.UserController && globalThis.LOG && console.log("USER: ", userResponse);
            store.set("user", userResponse);
            return response;
        })
        .catch((error) => {
            globalThis.DEBUG?.UserController && globalThis.LOG && console.log("ChangeProfile error: ", error);
            return error;
        });
    }

    static async changeUserPassword(formData: FormData) {
        globalThis.DEBUG?.UserController && globalThis.LOG && console.info("UserController::changeUserPassword");
        let data = preparePassword(formDataToObjectConverter(formData) as TUserPasswordFormData);
        globalThis.DEBUG?.UserController && globalThis.LOG && console.log("ChangePassword: ", data);

        return userAPI.changePassword(data)
        .then((response) => {
            const userResponse = response.response;
            globalThis.DEBUG?.UserController && globalThis.LOG && console.log("CHANGE PASSWORD: ", userResponse);
            return response;
        })
        .catch((error) => {
            globalThis.DEBUG?.UserController && globalThis.LOG && console.log('ChangePassword error: ', error);
            return error;
        });
    }

    static async changeAvatar(formData: FormData) {
        globalThis.DEBUG?.UserController && globalThis.LOG && console.info("UserController::changeAvatar");
        console.log(formData)
        return userAPI.changeAvatar(formData)
        .then((response) => {
            globalThis.DEBUG?.UserController && globalThis.LOG && console.log("CHANGE AVATAR: ", response.status);
            const userResponse = response.response;
            globalThis.DEBUG?.UserController && globalThis.LOG && console.log("USER: ", userResponse);
            store.set("user", userResponse);
            return response;
        })
        .catch((error) => {
            globalThis.DEBUG?.UserController && globalThis.LOG && console.log('ChangeAvatar error: ', error);
            return error;
        });
    }

    static async getUsersByLogin(login: string) {
        globalThis.DEBUG?.UserController && globalThis.LOG && console.info("UserController::getUsersByLogin");
        globalThis.DEBUG?.UserController && globalThis.LOG && console.log(login);
        return userAPI.searchUserByLogin({ login })
        .then((response) => {
            return response;
        })
        .catch((error) => {
            globalThis.DEBUG?.UserController && globalThis.LOG && console.log('Get user by login error: ', error);
            return error;
        });
    }
}

export default UserController
