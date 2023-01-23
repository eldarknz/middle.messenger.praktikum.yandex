import { 
    SET_USER,
    DELETE_USER,
    SET_ERROR
} from "../actions/user";

export interface Action {
    type: string;
    payload?: any;
}

const initialState = {
    isLoggedIn: false,

    profile: null,
    error: null
};

export const userReducer = (state = initialState, action: Action) => {
    switch (action.type) {
        case SET_USER:
            return { 
                ...state,
                profile: action.payload,
                error: null
            };
        case DELETE_USER:
            return {
                ...state,
                profile: null,
                error: null
            };
        case SET_ERROR:
            return {
                ...state,
                profile: null,
                error: action.payload
            };
        default: {
            return state;
        }
    }
};
