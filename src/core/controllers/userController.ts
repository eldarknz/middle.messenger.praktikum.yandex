// Core
import { store } from '@core/store';
import { UserAPI } from '@core/api/userApi';
// Utils
import { formDataToObjectConverter } from '@utils/formDataToObjectConverter';
import { errorHandler } from '@utils/errorHandler';
// Types
import {
    TUserProfileData,
    TUserPasswordData,
    TUserPasswordFormData,
} from '@custom_types/index';

const preparePassword = (data: TUserPasswordFormData): TUserPasswordData => ({
    newPassword: data.new_password ?? '',
    oldPassword: data.password ?? '',
});

const userAPI = new UserAPI();

export class UserController {
    static async changeProfile(formData: FormData) {
        const data = formDataToObjectConverter(formData) as TUserProfileData;

        return userAPI
            .changeProfile(data)
            .then((response) => {
                store.set('user', response.response);
                return response;
            })
            .catch((error) => {
                errorHandler(error);
                return error;
            });
    }

    static async changeUserPassword(formData: FormData) {
        const data = preparePassword(
            formDataToObjectConverter(formData) as TUserPasswordFormData
        );

        return userAPI
            .changePassword(data)
            .then((response) => response)
            .catch((error) => {
                errorHandler(error);
                return error;
            });
    }

    static async changeAvatar(formData: FormData) {
        return userAPI
            .changeAvatar(formData)
            .then((response) => {
                store.set('user', response.response);
                return response;
            })
            .catch((error) => {
                errorHandler(error);
                return error;
            });
    }

    static async getUsersByLogin(login: string) {
        return userAPI
            .searchUserByLogin({ login })
            .then((response) => response)
            .catch((error) => {
                errorHandler(error);
                return error;
            });
    }
}
