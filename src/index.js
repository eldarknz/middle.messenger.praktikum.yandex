import { ROUTES } from "./utils/constants";

import {
    ChatPage,
    ProfilePage,
    LoginPage,
    RegistrationPage,
    PageNotFoundPage,
    ServerErrorPage,
} from "./pages";

import "./styles/globals.scss";

const routes = {
    [ROUTES.home.path]: ChatPage,
    [ROUTES.profile.path]: ProfilePage,
    [ROUTES.login.path]: LoginPage,
    [ROUTES.register.path]: RegistrationPage,
    [ROUTES.error_404.path]: PageNotFoundPage,
    [ROUTES.error_500.path]: ServerErrorPage
}

const app = document.getElementById("root");
app.innerHTML = routes[window.location.pathname]?.();
