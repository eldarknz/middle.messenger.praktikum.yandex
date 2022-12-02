import Block from "./core/block";
import renderDOM from "./core/renderDom";
import { ROUTES } from "./utils/constants";
import Router from "./core/router";

import {
    MainPage,
    /*ChatPage,
    ProfilePage,
    ProfileEditPage,
    PasswordEditPage,*/
    LoginPage,
    RegistrationPage,
    NotFoundErrorPage,
    ServerErrorPage,
    /*TestPage*/
} from "./pages";

import "./styles/globals.scss";

//const currentLocation: string = window.location.pathname;

const pages: { [key: string]: Block } = {
    [ROUTES.home.path]: MainPage,
    //[ROUTES.chat.path]: ChatPage,
    //[ROUTES.profile.path]: ProfilePage,
    //[ROUTES.profileEdit.path]: ProfileEditPage,
    //[ROUTES.passwordEdit.path]: PasswordEditPage,
    [ROUTES.login.path]: LoginPage,
    [ROUTES.register.path]: RegistrationPage,
    [ROUTES.error_404.path]: NotFoundErrorPage,
    [ROUTES.error_500.path]: ServerErrorPage,
    //[ROUTES.test.path]: TestPage,
}

/*Object.entries(pages).forEach(([url, page]) => {
    if (currentLocation === url) {
        renderDOM('#root', page);
    }
});*/

const router = new Router("#root");

document.addEventListener('DOMContentLoaded', () => {

    //console.log(MainPage);
    //Object.entries(pages).forEach(([url, page]) => {
    //    router.use(url, page)
    //});

    window.router = router;

    console.log(window.router);

    router
        .use("/", MainPage)
        .use("/login", LoginPage)
        .use("/register", RegistrationPage)
        .start();

    /*setTimeout(() => {
        router.go("/login");
    }, 1000);
        
    // А можно и назад
    setTimeout(() => {
        router.back();
    }, 3000);
    
    // И снова вперёд
    setTimeout(() => {
        router.forward();
    }, 5000);*/
});


/*async function init() {


    router
        .use({
            pathname: '/', block: LoginPage, props: {user: currentUser}
        })
        .use({
            pathname: '/sign-up', block: RegistrationPage, props: {user: currentUser}
        })
        .use({
            pathname: '/messenger', block: ChatPage, props: {},
            exact: false, needAuth: true, isAuth: !!currentUser, onUnautorized: checkAuth,
        })
        .use({
            pathname: '/settings', block: ProfilePage,
            exact: false, needAuth: true, isAuth: !!currentUser, onUnautorized: checkAuth,
        })
        .use({pathname: '/500', block: ErrorPage, props: {code: 404}})
        .use({pathname: '/404', block: ErrorPage, props: {code: 500}})
        .start();

}

init();*/
