import { ROUTES } from "./utils/constants";

import { 
    LoginPage
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
    [ROUTES.login.path]: LoginPage,
}

const app = document.getElementById("root");
app.innerHTML = routes[window.location.pathname]?.();