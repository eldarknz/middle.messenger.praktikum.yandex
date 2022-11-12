import Block from "./core/block";
import renderDOM from "./core/renderDom";
import { ROUTES } from "./utils/constants";

import {
    MainPage,
    ChatPage,
    ProfilePage,
    LoginPage,
    RegistrationPage,
    NotFoundErrorPage,
    ServerErrorPage,
} from "./pages";

import "./styles/globals.scss";

const currentLocation: string = window.location.pathname;

type TPages = { [key: string]: Block };

const pages: TPages = {
    [ROUTES.home.path]: MainPage,
    [ROUTES.chat.path]: ChatPage,
    [ROUTES.profile.path]: ProfilePage,
    [ROUTES.login.path]: LoginPage,
    [ROUTES.register.path]: RegistrationPage,
    [ROUTES.error_404.path]: NotFoundErrorPage,
    [ROUTES.error_500.path]: ServerErrorPage
}

Object.entries(pages).forEach(([url, page]) => {
    if (currentLocation === url) {
        renderDOM('#root', page);
    }
});
