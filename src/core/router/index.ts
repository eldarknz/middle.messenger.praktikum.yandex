import { ROUTES } from "../../utils/constants";
import Block from "../block";
import Route from "./route";

type TRouteOptions = {
    protectedRoute?: boolean;
    redirectTo?: string,
};

/**
 * Класс для работы с роутером
 * паттерн Singleton
 */
class Router {

    private static _instance: Router;
    private routes: Route[] = [];
    private currentRoute: Route | null = null;
    private history = window.history;
    private _rootQuery: Nullable<string> = null;
    _authCheck!: () => Promise<boolean>;

    constructor(rootQuery: string) {
        // Определяем и сохраняем экземпляр в поле класса и вернуть его, если это значение уже существует
        if (Router._instance) {
            return Router._instance;
        }
        Router._instance = this;

        this._rootQuery = rootQuery;
    }

    static getInstanse() {
        return Router._instance;
    }

    getCurrentRoute() {
        return this.currentRoute;
    }

    authCheck(checker: () => Promise<boolean>) {
        this._authCheck = checker;
        return this;
    }

    // регистрирует блок по пути в роут и возвращает себя — чтобы можно было выстроить в цепочку
    use(pathname: string, block: typeof Block, protectedRoute?: boolean, redirectTo?: string) {
        //console.log('1. Региcтрация блока - use');
        //console.log(block);
        // Cоздаем новый маршрут (путь, блок, запрос)
        const route = new Route(pathname, block, { 
            rootQuery: this._rootQuery,
            protectedRoute,
            redirectTo,
        })

        //console.log("   route:", route);
        //console.log(pathname, block, { rootQuery: this._rootQuery });
        // Добавляем в массив маршрутов
        this.routes.push(route);
        
       //console.log("   routes:", this.routes);
        return this;
    }

    // по событию onpopstate запускает приложение
    start() {
       //console.log('2. Запуск приложения - start');
        // Реагируем на изменения в адресной строке и вызываем перерисовку
        // Событие popstate вызывается, когда изменяется активная запись истории.
        window.onpopstate = ((event: any) => {
           //console.log("   window.onpopstate");
            //console.log("   event.currentTarget.location.pathname: ", event.currentTarget.location.pathname);
            // передаем урл из адресной строки текущего роута, на котором сработало событие
            this._onRoute(event.currentTarget.location.pathname)
        }).bind(this);

        //console.log("   window.location.pathname: ", window.location.pathname)
        this._onRoute(window.location.pathname);
    } 

    private async _onRoute(pathname: string) {
        //console.log('3. Получение роута в зависимости от урла и его рендер - _onRoute');
        // получаем нужный роут
        let route = this.getRoute(pathname);
        const isAuth = await this._authCheck();
        console.log(isAuth);

        // проверяем авторизован ли пользователь
        if (route?.props.protectedRoute && !isAuth) {
            this.go(ROUTES.login.path);
            return;
        }

        if (route?.props.redirectTo && isAuth) {
            this.go(route?.props.redirectTo);
            return;
        }

        //console.log("   route: ", route);
        // если роут отсутствует
        if (!route) {
           //console.log('No route');
            route = this.getRoute(ROUTES.error_404.path)
        }

        // если есть текущий роут, который не равен новому роуту
        // то вызываем метод leave, который вызывает метод hide у блока
       //console.log("--------------", this.currentRoute, route);
        if (this.currentRoute && this.currentRoute !== route) {
           //console.log("   Скрытие текущего роута");
            this.currentRoute.leave();
        }

        this.currentRoute = route as Route;
        route!.render();
        //route.render(route, pathname);
    }

    // переходит на нужный роут и отображает нужный блок;
    go(pathname: string) {
       //console.log('Router.go', pathname);
        this.history.pushState({}, "", pathname);
        this._onRoute(pathname);
    }

    // возвращает в прошлое состояние и показывает блок, соответствующий тому состоянию
    back() {
        this.history.back();
    }

    // перезагрузка страницы
    reload() {
        window.location.reload();
    }

    //  переходит в следующие состояние и показывает соответствующий блок
    forward() {
        this.history.forward();
    }

    // возвращаем нужный роут
    getRoute(pathname: string) {
        //console.log("3.1. Получение нужного роута - getRoute");
        //console.log(this.routes);
        return this.routes.find(route => route.match(pathname));
    }
}

export default Router
