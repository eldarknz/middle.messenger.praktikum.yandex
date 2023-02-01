import Block from "./core/block";
import { ROUTES } from "./utils/constants";
import Router from "./core/router";
//import AuthController from "./controllers/authContorller";
//import { store } from "./services";

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
//import AuthApi from "./api/authApi";

const pages: { [key: string]: typeof Block } = {
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

const AppRouter = new Router("#root");

/*const authContorller = new AuthController();

authContorller.fetchUser()
    .then(() => {

        console.log('aaa');

        window.router = router;

        Object.entries(pages).forEach(([url, page]) => {
            console.log(page);
            router.use(url, page);
        });
        router.start()

    });*/

//const authApi = new AuthApi();

document.addEventListener("DOMContentLoaded", () => {

    //store.on('changed', {});

    //console.log(store.getState());

    /*console.log(authApi.signUp({
        "first_name": "Sasasa",
        "second_name": "Sdsdsds",
        "login": "Adfdfdfd",
        "email": "Adfd@mail.com",
        "password": "123456",
        "phone": "89223332211"
    }));*/

    //const authContorller = new AuthController();

    //console.log(AuthApi);
    console.log('aaaaa');

    window.router = AppRouter;

    //MainPage.render();

    Object.entries(pages).forEach(([url, page]) => {
        AppRouter.use(url, page);
    });
    //router.use("/", MainPage)
    //router.use("/404", NotFoundErrorPage as typeof Block)
    //router.use("/500", ServerErrorPage as typeof Block)
    AppRouter.start()

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
