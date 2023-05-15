// Types
import { IUser, IChatUser } from '@custom_types/index';

export const sortChatUsersByLogin = (
    activeChatUsers: IChatUser[] | IUser[]
) => {
    activeChatUsers.sort((a: IChatUser, b: IChatUser) => {
        const loginA = a.login.toUpperCase();
        const loginB = b.login.toUpperCase();
        if (loginA < loginB) return -1;
        if (loginA > loginB) return 1;
        return 0;
    });
};
