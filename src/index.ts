import Router from "./core/router";
import AuthController from "./core/controllers/authContorller";
import { store, StoreEvents } from "./core/store";
import { ROUTES } from "./utils/constants";

import {
    MainPage,
    ChatPage,
    ProfilePage,
    ProfileEditPage,
    PasswordEditPage,
    LoginPage,
    RegistrationPage,
    NotFoundErrorPage,
    ServerErrorPage
} from "./pages";

import "./styles/globals.scss";

const authChecker = async () => {
    const user = await AuthController.checkUser()
    return user.status === 200;
};

const AppRouter = new Router("#root");

document.addEventListener("DOMContentLoaded", () => {
    store.on(StoreEvents.Updated, () => {});

    window.router = AppRouter;

    AppRouter
    .authCheck(authChecker)
    .use(ROUTES.home.path, MainPage)
    .use(ROUTES.chat.path, ChatPage, true)
    .use(ROUTES.profile.path, ProfilePage, true)
    .use(ROUTES.profileEdit.path, ProfileEditPage, true)
    .use(ROUTES.passwordEdit.path, PasswordEditPage, true)
    .use(ROUTES.login.path, LoginPage, false, ROUTES.profile.path)
    .use(ROUTES.register.path, RegistrationPage, false, ROUTES.profile.path)
    .use(ROUTES.error_404.path, NotFoundErrorPage)
    .use(ROUTES.error_500.path, ServerErrorPage)
    .start();
});
