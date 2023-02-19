import UserAPI from "../api/userApi";
import { store } from "../store";
import { TUserProfileData, TUserPasswordData } from "../../types";
import formDataToObjectConverter from "../../utils/formDataToObjectConverter";
import Router from "../router";
import { ROUTES } from "../../utils/constants";

type TUserPasswordFormData = {
    new_password: string,
    password: string,
    confirm_password: string
};

const preparePassword = (data: TUserPasswordFormData) => {
    return {
        newPassword: data["new_password"] ?? "",
        oldPassword: data["password"] ?? "",
    };
}

const userAPI = new UserAPI();

class UserController {
    static async changeProfile(formData: FormData) {
        const data = formDataToObjectConverter(formData) as TUserProfileData;

        console.log("ChangeProfile: ", data);

        return userAPI.changeProfile(data)
        .then((user: XMLHttpRequest) => {
            const userResponse = user.response;
            console.log("USER: ", userResponse);
            store.set("user", userResponse);
            Router.getInstanse().go(ROUTES.profile.path);
        })
        .catch((err) => {
            console.log("ChangeProfile error: ", err);
        });
    }

    static async changeUserPassword(formData: FormData) {
        let data = preparePassword(formDataToObjectConverter(formData) as TUserPasswordFormData);
        console.log("ChangePassword: ", data);

        return userAPI.changePassword(data)
        .then((user: XMLHttpRequest) => {
            const userResponse = user.response;
            console.log("CHANGE PASSWORD: ", userResponse);
            Router.getInstanse().go(ROUTES.profile.path);
        })
        .catch((err) => {
            console.log('ChangePassword err: ', err);
        });
    }

    static async changeAvatar(formData: FormData) {
        return userAPI.changeAvatar(formData)
        .then((response: XMLHttpRequest) => {
            console.log("CHANGE AVATAR: ", response.status);
            const userResponse = response.response;
            console.log("USER: ", userResponse);
            store.set("user", userResponse);
            //Router.getInstanse().go(ROUTES.profile.path);
            return response;
        })
        .catch((err) => {
            console.log('ChangeAvatar err: ', err);
            return err;
        });
    }
}

export default UserController
