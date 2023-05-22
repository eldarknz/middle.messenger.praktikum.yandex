// Core
import { TState } from '@core/store';
// Components
import { Avatar } from '@components/ui/avatar';
import { Image } from '@components/ui/image';
import { Icon } from '@components/ui/icon';
import { Skeleton } from '@components/ui/skeleton';
// Handlers
import { API_RESOURCES_PATH } from '@utils/constants';
// Types
import { IUser } from '@custom_types/index';

export const ProfileUserAvatar = (state: TState) => {
    if (Object.keys(state).length !== 0 && (Boolean(state.user))) {
        if ((state.user as IUser).avatar != null) {
            return new Avatar({
                size: 'lg',
                content: new Image({
                    src: API_RESOURCES_PATH + (state.user as IUser).avatar,
                }),
            });
        }
        return new Avatar({
            size: 'lg',
            content: new Icon({
                name: "media",
                color: 'white',
                size: 'xxl',
            }),
        });
    }
    return new Skeleton({
        width: 130,
        isAnimation: true,
        isCircle: true,
    });
};
