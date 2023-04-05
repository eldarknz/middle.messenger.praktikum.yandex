// Core
import { store } from "@core/store";
import UserAPI from "@core/api/userApi";
// Utils
import formDataToObjectConverter from "@utils/formDataToObjectConverter";
// Types
import { TUserProfileData, TUserPasswordData, TUserPasswordFormData } from "@custom_types/index";

const preparePassword = (data: TUserPasswordFormData): TUserPasswordData => {
    return {
        newPassword: data["new_password"] ?? "",
        oldPassword: data["password"] ?? "",
    };
}

const userAPI = new UserAPI();

class UserController {

    static async changeProfile(formData: FormData) {
        const data = formDataToObjectConverter(formData) as TUserProfileData;

        return userAPI.changeProfile(data)
        .then((response) => {
            store.set("user", response.response);
            return response;
        })
        .catch((error) => {
            return error;
        });
    }

    static async changeUserPassword(formData: FormData) {
        let data = preparePassword(formDataToObjectConverter(formData) as TUserPasswordFormData);

        return userAPI.changePassword(data)
        .then((response) => {
            return response;
        })
        .catch((error) => {
            return error;
        });
    }

    static async changeAvatar(formData: FormData) {
        return userAPI.changeAvatar(formData)
        .then((response) => {
            store.set("user", response.response);
            return response;
        })
        .catch((error) => {
            return error;
        });
    }

    static async getUsersByLogin(login: string) {
        return userAPI.searchUserByLogin({ login })
        .then((response) => {
            return response;
        })
        .catch((error) => {
            return error;
        });
    }
}

export default UserController
