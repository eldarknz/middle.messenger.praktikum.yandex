
// Core
import { Block } from "@core/block";
import { Route } from "@core/router/route";
// Utils
import { ROUTES } from "@utils/constants";;

/**
 * Класс для работы с роутером
 * паттерн Singleton
 */
export class Router {

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
        // Cоздаем новый маршрут (путь, блок, запрос)
        const route = new Route(pathname, block, { 
            rootQuery: this._rootQuery,
            protectedRoute,
            redirectTo,
        })

        // Добавляем в массив маршрутов
        this.routes.push(route);
        
        return this;
    }

    // по событию onpopstate запускает приложение
    start() {
        // Реагируем на изменения в адресной строке и вызываем перерисовку
        // Событие popstate вызывается, когда изменяется активная запись истории.
        window.onpopstate = ((event: any) => {
            // передаем урл из адресной строки текущего роута, на котором сработало событие
            this._onRoute(event.currentTarget.location.pathname)
        }).bind(this);

        this._onRoute(window.location.pathname);
    } 

    private async _onRoute(pathname: string) {
        // получаем нужный роут
        let route = this.getRoute(pathname);
        const isAuth = await this._authCheck();

        // проверяем авторизован ли пользователь
        if (route?.props.protectedRoute && !isAuth) {
            this.go(ROUTES.login.path);
            return;
        }

        if (route?.props.redirectTo && isAuth) {
            this.go(route?.props.redirectTo);
            return;
        }

        // если роут отсутствует
        if (!route) {
            route = this.getRoute(ROUTES.error_404.path)
        }

        // если есть текущий роут, который не равен новому роуту
        // то вызываем метод leave, который вызывает метод hide у блока
        if (this.currentRoute && this.currentRoute !== route) {
            this.currentRoute.leave();
        }

        this.currentRoute = route as Route;
        route!.render();
    }

    // переходит на нужный роут и отображает нужный блок;
    go(pathname: string) {
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
        return this.routes.find(route => route.match(pathname));
    }
}
