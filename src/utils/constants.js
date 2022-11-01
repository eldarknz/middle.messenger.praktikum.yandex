export const ROUTES_LIST       = '/';
export const ERROR_404         = '/404';
export const ERROR_500         = '/500';
export const LOGIN             = '/login';
export const REGISTER          = '/register';
export const PROFILE           = '/profile';
export const CHANGE_PASSWORD   = '/change_password';
export const INSTANT_MESSENGER = '/im';

export const ROUTES = {
    home: { title: "Мессенджер", path: "/" },
    login: { title: "Вход", path: "/login" },
    register: { title: "Регистрация", path: "/register" },
    forgot_password: { title: "Восстановление пароля", path: "/forgot-password" },
    reset_password: { title: "Восстановление пароля", path: "/reset-password" },
    profile: { title: "Личный кабинет", path: "/profile" },
    change_password: { title: "Измненеия пароля", path: "change_password" },
    error_404: { title: "Ошибка 404", path: "/404"},
    error_500: { title: "Ошибка 500", path: "/500"},
};
