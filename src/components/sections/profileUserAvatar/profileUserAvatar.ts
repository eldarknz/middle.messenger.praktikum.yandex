//Components
import { Avatar } from "@components/ui/avatar";
import { Image } from "@components/ui/image";
import { IconMedia } from "@components/ui/icon";
import { Skeleton } from "@components/ui/skeleton";
// Handlers
import { API_RESOURCES_PATH } from "@utils/constants";
// Types
import { IUser } from "@custom_types/index";

export const ProfileUserAvatar = (state: Indexed) => {
    if (Object.keys(state).length !== 0 && state.user) {
        if ((state.user as IUser).avatar != null) {
            return new Avatar({
                size: "lg",
                content: new Image({
                    src: API_RESOURCES_PATH + (state.user as IUser).avatar
                })
            });
        } else {
            return new Avatar({
                size: "lg",
                content: new IconMedia({
                    color: "white",
                    size: "xxl",
                })
            });
        }
    } else {
        return new Skeleton({
            width: 130,
            isAnimation: true,
            isCircle: true
        });
    }
};
