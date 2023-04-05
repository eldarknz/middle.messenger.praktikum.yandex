// Components
import { Skeleton } from "@components/ui/skeleton";
import { Text } from "@components/ui/text";
// Types
import { IUser } from "@custom_types/index";

export const ProfileUserName = (state: Indexed) => {
    if (Object.keys(state).length !== 0 && state.user) {
        return new Text({
            content: (state.user as IUser).first_name
        });
    } else {
        return new Skeleton({
            height: 20,
            isAnimation: true
        });
    }
}
