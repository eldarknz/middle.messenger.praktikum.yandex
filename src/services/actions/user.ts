import { UserRequestData } from "../../api/apiTypings";

/* Actions */
export const SET_USER = 'SET_USER';
export const DELETE_USER = 'DELETE_USER';
export const SET_ERROR = 'SET_ERROR';

/**
 * Action Creators
 */

export const setUser = (user: UserRequestData) => ({
    type: SET_USER,
    payload: user
});

export const deleteUser = () => ({
    type: DELETE_USER
});

export const setError = (error: { reason: string }) => ({
    type: SET_ERROR,
    payload: error
});
