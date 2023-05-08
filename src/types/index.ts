export type APIError = {
    reason: string;
    status: string;
};

export type ResponseData = {} | APIError;

export type TRoutes = { [key: string]: { title: string, path: string } }

// Авторизация, регистрация
export type TSignUpData = {
    first_name: string,
    second_name: string,
    login: string,
    email: string,
    password: string,
    phone: string,
};

export type TSignInData = {
    login: string,
    password: string,
};

// Профиль
export type TUserProfileData = {
    first_name: string,
    second_name: string,
    display_name: string,
    login: string,
    email: string,
    phone: string,
};

export type TUserPasswordData = {
    oldPassword: string,
    newPassword: string
};
  
export type TUserPasswordFormData = {
    new_password: string,
    password: string,
    confirm_password: string
};

export type TUserLogin = {
    login: string,
};

export interface IUser {
    id: number;
    first_name: string;
    second_name: string;
    display_name: string;
    login: string;
    email: string;
    phone: string;
    avatar: string;
}

// Чат
export type TLastMessageUser = {
    first_name: string,
    second_name: string,
    avatar: string | null
    email: string,
    login: string,
    phone: string
}

export type TLastMessage = {
    user: TLastMessageUser,
    time: string,
    content: string,
};
  
export type TChatItem = {
    id: number,
    title: string,
    avatar: string | null,
    unread_count: number,
    last_message: TLastMessage | null,
    created_by: number
};

export interface IChatUser extends IUser {
    role: string;
}

export type TChatTitleData = {
    title: string
};

export type TChatIdData = {
    chatId: number
};

export type TActiveChat = { 
    users: IChatUser[],
    id: number
};
