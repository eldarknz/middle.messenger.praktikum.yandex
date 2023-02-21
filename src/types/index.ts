export type APIError = {
    reason: string;
    status: string;
};

export type ResponseData = {} | APIError;

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

export type TLastMessage = {
    user: TUserProfileData,
    time: string,
    content: string,
};
  
export type TChatItem = {
    id: number,
    title: string,
    avatar: string | null,
    created_by: number,
    unread_count: number,
    last_message: TLastMessage,
};
