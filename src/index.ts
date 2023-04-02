import Router from "./core/router";
import AuthController from "./core/controllers/authContorller";
import { store, StoreEvents } from "./core/store";
import { ROUTES } from "./utils/constants";
import { DEV_MODE } from "./core/config/env.config";

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

globalThis.LOG = DEV_MODE ? console.log.bind(console) : function () {};
globalThis.DEBUG = { 
    EventBus: !DEV_MODE,
    Block: !DEV_MODE,
    RenderDOM: !DEV_MODE,
    Store: !DEV_MODE,
    AuthController: !DEV_MODE,
    UserController: !DEV_MODE,
    ChatController: !DEV_MODE,
    AuthAPI: !DEV_MODE,
    UserAPI: !DEV_MODE,
    ChatAPI: !DEV_MODE
};

if (DEV_MODE) console.info('---------------------------------------------------------> 🛠️ Development mode ON! 🛠️ <---------------------------------------------------------');

const authChecker = async () => {
    const user = await AuthController.checkUser()
    return user.status === 200;
};

const AppRouter = new Router("#root");

const protectedRoute = true;
const redirectTo = ROUTES.chat.path;

document.addEventListener("DOMContentLoaded", () => {
    store.on(StoreEvents.Updated, () => {});

    window.router = AppRouter;

    AppRouter
    .authCheck(authChecker)
    .use(ROUTES.home.path, MainPage)
    .use(ROUTES.chat.path, ChatPage, protectedRoute)
    .use(ROUTES.profile.path, ProfilePage, protectedRoute)
    .use(ROUTES.profileEdit.path, ProfileEditPage, protectedRoute)
    .use(ROUTES.passwordEdit.path, PasswordEditPage, protectedRoute)
    .use(ROUTES.login.path, LoginPage, !protectedRoute, redirectTo)
    .use(ROUTES.register.path, RegistrationPage, !protectedRoute, redirectTo)
    .use(ROUTES.error_404.path, NotFoundErrorPage)
    .use(ROUTES.error_500.path, ServerErrorPage)
    .start();
});
