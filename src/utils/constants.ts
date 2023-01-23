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

export const API_ENDPOINTS = {
    auth: {
        signUp: "/auth/signup",
        signIn: "/auth/signin",
        user: "/auth/user",
        logout: "/auth/logout"
    }
}
