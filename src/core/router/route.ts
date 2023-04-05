// Core
import Block from "@core/block";
import renderDOM from "@core/renderDom";

/**
 * Блок Route получает в качестве аргументов путь, соответствующий ему блок и его свойства
 */
class Route {
    private _pathname: string;
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
        if (this.match(pathname)) {
            this._pathname = pathname;
            this.render();
        }
    }

    match(pathname: string) {
        return pathname === this._pathname;
    }

    // вызывает hide у элемента
    leave() {
        if (this._block) {
            this._block.hide();
            this._block = null;
        }
    }

    // создаёт блок, если тот ещё не был создан (нужно создавать блок только после первого перехода на страницу), иначе вызывает у блока метод show
    render() {
        if (!this._block) {
            this._block = new this._blockClass(this._props);
        } else {
            this._block.show();
        }
      
        renderDOM(this._props.rootQuery, this._block);
    }
    

};

export default Route
