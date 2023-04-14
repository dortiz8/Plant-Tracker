import { UserState } from ".";
import { Auth } from "../../models/Auth";
import { AuthResponseBody } from "../../models/IAuthResponse";
import * as fromUser from "../actions/user.action"; 


export interface AuthState {
    data: Auth, 
    loaded: boolean, 
    loading: boolean
    errMessage: string
}

export const initialUser: AuthState = {
    data: new Auth(),
    loaded: false, 
    loading: false,
    errMessage: "",
}

export function reducer(state: AuthState = initialUser, 
    action: fromUser.UserAction): AuthState {
    switch (action.type) {
        case fromUser.LOAD_USER: {
            return {
                ...state,
                loading: true,
                loaded: false,

            }
        }
        case fromUser.LOAD_USER_FAIL: {
            const { status, statusText } = action.payload;
            return {
                ...state,
                loading: false,
                loaded: false,
                errMessage: `${status}: ${statusText}`
            }
        }
        case fromUser.LOAD_USER_SUCCESS: {
            const data = action.payload;
            console.log(data, ' from reducer')
            return {
                ...state,
                loading: false,
                loaded: true,
                data
            }
        }
    }
    return state; 
    }

export const getUserLoading = (state: AuthState) => state.loading;
export const getUserLoaded = (state: AuthState) => state.loaded;
export const getUser = (state: AuthState) => state.data;
export const getUserId = (state: AuthState) => state.data.userId; 
export const getUserErrMessage = (state: AuthState) => state.errMessage;