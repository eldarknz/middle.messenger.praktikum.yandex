import Router from "../src/core/router";

declare global {

    export interface Window { router: Router; }

    export type Nullable<T> = T | null;

    export type Keys<T extends Record<string, unknown>> = keyof T;
    export type Values<T extends Record<string, unknown>> = T[Keys<T>];

    export type TProps = Record<string, any>;

    export type Key = keyof Object;

}

    declare module '*.png';
  
export {};

export type TChatData = {
    readonly _id:string,
    readonly title: string,
    readonly users: { 
        readonly [key: string]: string,
    }[],
    readonly message: { 
        readonly [key: string]: string,
    }, 
    readonly date_created: string,
    readonly date_updated: string,
    readonly time_created: string,
    readonly time_updated: string,
};

export type TUserData = { 
    readonly title: string,
    readonly value: string,
};

export type TBlockAttributes = { readonly [key: string]: string; };

export type TCheckFunction = (value: string) => boolean;
export type TCheckLength = (min: number, max: number, value: string) => boolean;
export type TCheckPasswordConfirm = (value_1: string, value_2: string) => boolean;
export type TShowError = (input: HTMLElement, selector: string, message?: string) => void;
export type THideError = (input: HTMLElement, selector: string) => void;

export type TRoutes = { [key: string]: { title: string, path: string } }
