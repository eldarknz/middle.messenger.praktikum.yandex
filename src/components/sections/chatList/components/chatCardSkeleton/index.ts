// Core
import { Block } from '@core/block';
// Components
import { Skeleton } from '@components/ui/skeleton';
// Template
import template from './chatCardSkeleton.tmpl';
// Styles
import './chatCardSkeleton.scss';

export class ChatCardSkeleton extends Block {
    constructor(props?: Record<string, unknown>) {
        const avatar = new Skeleton({
            width: 34,
            isCircle: true,
        });

        const title = new Skeleton({
            height: 14,
        });

        const message = [
            new Skeleton({
                height: 10,
            }),
            new Skeleton({
                height: 10,
            }),
        ];

        const datetime = new Skeleton({
            height: 12,
        });

        super({ ...props, avatar, title, message, datetime });
    }

    render() {
        return this.compile(template, this.props);
    }
}
