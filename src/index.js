import { ROUTES } from "./utils/constants";

import {
    ChatPage,
    LoginPage,
    RegistrationPage,
    PageNotFoundPage,
    ServerErrorPage,
} from "./pages";

import "./styles/globals.scss";

/*import { 
    ERROR_404,
    ERROR_500,
    ROUTES_LIST,
    LOGIN, REGISTER,
    PROFILE,
    CHANGE_PASSWORD,
    INSTANT_MESSENGER
 } from './const/routes';*/

const routes = {
    [ROUTES.home.path]: ChatPage,
    [ROUTES.login.path]: LoginPage,
    [ROUTES.register.path]: RegistrationPage,
    [ROUTES.error_404.path]: PageNotFoundPage,
    [ROUTES.error_500.path]: ServerErrorPage
}

const app = document.getElementById("root");
app.innerHTML = routes[window.location.pathname]?.();