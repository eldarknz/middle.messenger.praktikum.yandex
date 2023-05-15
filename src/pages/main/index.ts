// Core
import { Block } from '@core/block';
// Components
import { Grid } from '@components/ui/grid';
import { MainHeader } from '@components/sections/mainHeader/mainHeader';
import { MainFooter } from '@components/sections/mainFooter/mainFooter';
import { MainHero } from '@components/sections/mainHero/mainHero';
// Template
import template from './main.tmpl';
// Styles
import './main.scss';

interface IMain {
    content?: Block | string;
    className?: string;
}

export class MainPage extends Block {
    constructor(props: IMain) {
        const content = new Grid.Container({
            isFluid: true,
            className: 'main-container',
            content: new Grid.Container({
                className: 'main-container__content',
                content: [new MainHeader(), new MainHero(), new MainFooter()],
            }),
        });

        super({ ...props, content });
    }

    render() {
        return this.compile(template, this.props);
    }
}
