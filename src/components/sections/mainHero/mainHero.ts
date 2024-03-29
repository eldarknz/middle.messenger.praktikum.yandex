// Core
import { Block } from '@core/block';
// Components
import { Button } from '@components/ui/button';
// Utils
import { ROUTES } from '@utils/constants';
import { AppRouter } from '../../../index';
// Templates
import template from './mainHero.tmpl';
// Styles
import './mainHero.scss';

export class MainHero extends Block {
    constructor(props?: Record<string, unknown>) {
        const callToActionButton = new Button({
            size: 'xl',
            shape: 'rounded',
            view: 'link',
            className: 'main-hero__btn',
            content: 'Попробовать бесплатно',
            events: {
                click: () => {
                    AppRouter.go(ROUTES.register.path);
                },
            },
        });

        super({ ...props, callToActionButton });
    }

    render() {
        return this.compile(template, this.props);
    }
}
