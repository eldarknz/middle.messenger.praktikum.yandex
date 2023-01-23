export type APIError = {
    reason: string;
    status: string;
};

export type ResponseData = {} | APIError;

/*export type UserRequestData = {
    id: number,
    first_name: string;
    second_name: string;
    display_name: string;
    login: string
    email: string
    phone: string;
    avatar: string;
}*/

export type UserRequestData = Omit<SignUpRequestData, 'password'> & { avatar: string; display_name: string; };

export type SignUpRequestData = {
    first_name: string,
    second_name: string,
    login: string,
    email: string,
    password: string,
    phone: string
};

export type SignInRequestData = {
    login: string;
    password: string;
};
