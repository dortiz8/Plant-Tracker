import { UserState } from ".";
import { Auth } from "../../models/Auth";
import { AuthResponseBody } from "../../models/IAuthResponse";
import { UserCreate } from "../../models/UserCreate";
import * as fromUser from "../actions/user.action"; 


export interface UserCreateState {
    data: UserCreate, 
    loaded: boolean, 
    loading: boolean
    errMessage: string
}

export const initialUser: UserCreateState = {
    data: new UserCreate(),
    loaded: false, 
    loading: false,
    errMessage: "",
}

export function reducer(state: UserCreateState = initialUser, 
    action: fromUser.UserAction): UserCreateState {
    switch (action.type) {
        case fromUser.CREATE_USER: {
            return {
                ...state,
                loading: true,
                loaded: false,

            }
        }
        case fromUser.CREATE_USER_FAIL: {
            const { status, statusText } = action.payload;
            console.log(status, statusText, ' from reducer')
            return {
                ...state,
                loading: false,
                loaded: false,
                errMessage: `${status}: ${statusText}`
            }
        }
        case fromUser.CREATE_USER_SUCCESS: {
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

export const getCreateUserLoading = (state: UserCreateState) => state.loading;
export const getCreateUserLoaded = (state: UserCreateState) => state.loaded;
export const getCreateUser = (state: UserCreateState) => state.data;
export const getCreateUserErrMessage = (state: UserCreateState) => state.errMessage;