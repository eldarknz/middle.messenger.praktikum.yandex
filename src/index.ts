import Block from "./core/block";
import { ROUTES } from "./utils/constants";
import Router from "./core/router";

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

const pages: { [key: string]: Block } = {
    [ROUTES.home.path]: MainPage,
    [ROUTES.chat.path]: ChatPage,
    [ROUTES.profile.path]: ProfilePage,
    [ROUTES.profileEdit.path]: ProfileEditPage,
    [ROUTES.passwordEdit.path]: PasswordEditPage,
    [ROUTES.login.path]: LoginPage,
    [ROUTES.register.path]: RegistrationPage,
    [ROUTES.error_404.path]: NotFoundErrorPage,
    [ROUTES.error_500.path]: ServerErrorPage
};

const router = new Router("#root");

document.addEventListener("DOMContentLoaded", () => {

    window.router = router;

    Object.entries(pages).forEach(([url, page]) => {
        console.log(page);
        router.use(url, page);
    });
    router.start()

    /*router
        .use(ROUTES.home.path, MainPage)
        .use(ROUTES.error_404.path, NotFoundErrorPage)
        .use(ROUTES.error_500.path, ServerErrorPage)
        .start()*/

    //setTimeout(() => {
    //    router.go(ROUTES.error_404.path);
    //}, 5000);
        

    //setTimeout(() => {
    //    router.go(ROUTES.home.path);
    //}, 10000);

    // А можно и назад
    //setTimeout(() => {
    //    router.back();
    //}, 3000);
    
    // И снова вперёд
    //setTimeout(() => {
    //    router.forward();
    //}, 5000);

});
