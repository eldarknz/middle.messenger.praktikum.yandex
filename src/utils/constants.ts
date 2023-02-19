import { TRoutes } from "../../declarations";

export const ROUTES: TRoutes = {
    login: { title: "Вход", path: "/login" },
    register: { title: "Регистрация", path: "/register" },
    home: { title: "Главная", path: "/" },
    chat: { title: "Мессенджер", path: "/chat" },
    profile: { title: "Личный кабинет", path: "/profile" },
    profileEdit: { title: "Редактирование профиля", path: "/profileEdit" },
    passwordEdit: { title: "Изменение пароля", path: "/passwordEdit" },
    error_404: { title: "Ошибка 404", path: "/404"},
    error_500: { title: "Ошибка 500", path: "/500"},
    test: { title: "Тестовая страница", path: "/test" }
};

export const API_PATH = 'https://ya-praktikum.tech/api/v2';
export const API_RESOURCES_PATH = `${API_PATH}/resources`;

export const API_ENDPOINTS = {
    auth: {
        signUp: `${API_PATH}/auth/signup`,
        signIn: `${API_PATH}/auth/signin`,
        user: `${API_PATH}/auth/user`,
        logout: `${API_PATH}/auth/logout`
    },
    users: {
        changeProfile: `${API_PATH}/user/profile`,
        changeAvatar: `${API_PATH}/user/profile/avatar`,
        changePassword: `${API_PATH}/user/password`,
        getUserById: (id: string) => `${API_PATH}/user/${id}`,
        searchUserByLogin: `${API_PATH}/user/search`
    }
}
