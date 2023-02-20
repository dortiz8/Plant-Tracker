import { Observable } from "rxjs";

export interface IMenuService {
    getGenusMenu: () => Observable<any>;
}