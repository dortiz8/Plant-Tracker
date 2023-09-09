import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { USERS_ROUTE } from "../../constants/routes";
import { UserCreateLoad } from "../../models/UserCreate";
import { IUserService } from "./IUserService";

@Injectable({
    providedIn: 'root',
})
export class UserService implements IUserService{
    constructor(private readonly httpClient: HttpClient){
    }
    postCreateUser(userCreateLoad: UserCreateLoad): Observable<any> {
        const { user } = userCreateLoad;
        console.log(user, ' from service')
        return this.httpClient.post(USERS_ROUTE, user);
    }
}