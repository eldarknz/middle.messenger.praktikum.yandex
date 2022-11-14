import { TRoutes } from "../../declarations";

export const ROUTES: TRoutes = {
    login: { title: "Вход", path: "/login" },
    register: { title: "Регистрация", path: "/register" },
    home: { title: "Главная", path: "/" },
    chat: { title: "Мессенджер", path: "/chat" },
    profile: { title: "Личный кабинет", path: "/profile" },
    profileEdit: { title: "Редактирование профиля", path: "/profile-edit" },
    passwordEdit: { title: "Изменение пароля", path: "/password-edit" },
    error_404: { title: "Ошибка 404", path: "/404"},
    error_500: { title: "Ошибка 500", path: "/500"},
};
