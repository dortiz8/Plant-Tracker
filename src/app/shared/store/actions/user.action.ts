import { Action } from "@ngrx/store";
import { AuthResponseBody } from "../../models/IAuthResponse";
import { UserCreate, UserCreateLoad } from "../../models/UserCreate";
import { UserLoad } from "../../models/UserLoad";

export const LOAD_USER = '[User] Load User'; 
export const LOAD_USER_FAIL = '[User] Load User Fail'; 
export const LOAD_USER_SUCCESS = '[User] Load User Success'; 
export const LOG_OFF_USER =  '[User] Log Off'; 

export const CREATE_USER = '[User] Create User';
export const CREATE_USER_FAIL = '[User] Create User Fail';
export const CREATE_USER_SUCCESS = '[User] Create User Success';


export class LoadUser implements Action{
    readonly type = LOAD_USER;
    constructor(public payload: any) { }
};
export class LoadUserFail implements Action{
    readonly type = LOAD_USER_FAIL;
    constructor(public payload: any) { }
};
export class LoadUserSuccess implements Action{
    readonly type = LOAD_USER_SUCCESS;
    constructor(public payload: AuthResponseBody) { }
};
export class LogOffUser implements Action{
    readonly type = LOG_OFF_USER;
};
export class CreateUser implements Action {
    readonly type = CREATE_USER;
    constructor(public payload: UserCreateLoad){}
};
export class CreateUserFail implements Action {
    readonly type = CREATE_USER_FAIL;
    constructor(public payload: any) { }
};
export class CreateUserSuccess implements Action {
    readonly type = CREATE_USER_SUCCESS;
    constructor(public payload: UserCreate) { }
};

export type UserAction = LoadUser | LoadUserFail | LoadUserSuccess | LogOffUser |
    CreateUser | CreateUserFail | CreateUserSuccess;