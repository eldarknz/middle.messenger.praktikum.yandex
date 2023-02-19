import Block from "../block";
import renderDOM from "../renderDom";

/**
 * Блок Route получает в качестве аргументов путь, соответствующий ему блок и его свойства
 */
class Route {

    public _pathname: string;
    private _blockClass: typeof Block;
    private _block: Block | null;
    private _props: TProps;

    constructor(pathname: string, view: typeof Block, props: TProps) {
        this._pathname = pathname;
        this._blockClass = view;
        this._block = null;
        this._props = props;
    }

    get pathname() {
        return this._pathname;
    }

    get props() {
        return this._props;
    }

    //  метод для отображения вьюшки, если переданный URL совпадает с URL текущего Route
    navigate(pathname: string): void {
        //console.log("navigate");
        if (this.match(pathname)) {
            this._pathname = pathname;
            this.render();
        }
    }

    match(pathname: string) {
        //console.log("Сравнение эквивалентности путей - match");
        return pathname === this._pathname;
    }

    // вызывает hide у элемента
    leave() {
        //console.log("Скрытие блока - leave");
        if (this._block) {
            this._block.hide();
        }
    }

    // создаёт блок, если тот ещё не был создан (нужно создавать блок только после первого перехода на страницу), иначе вызывает у блока метод show
    render() {
        //console.log("Рендер блока - render");
        //console.log("   ", this._block);
        if (!this._block) {
            //console.log(this._blockClass);
            this._block = new this._blockClass(this._props); //this._blockClass;
            //console.log(this._block);
        } else {
            this._block.show();
        }
      
        renderDOM(this._props.rootQuery, this._block);
        /*if (!this._block) {
            console.log(this._blockClass);
            this._block = new this._blockClass(this._props); //new this._blockClass()
           //console.log('-----------------');
            if (this._block)
                renderDOM(this._props.rootQuery, this._block);
            return;
        }

        this._block.show()*/
    }
    

};

export default Route

/**
const route = new Route('/buttons', Button, {
    rootQuery: '.app',
});

route.render();

console.log(route._pathname, route._props); // /buttons, {rootQuery: '.app'}

route.navigate('/buttons'); // show
route.navigate('/trash'); // не будет никакого лога
route.leave(); // hide
 */
