import { Observable } from "rxjs";
import { UserCreateLoad } from "../../models/UserCreate";

export interface IUserService {
    postCreateUser(userCreateLoad: UserCreateLoad): Observable<any>
}