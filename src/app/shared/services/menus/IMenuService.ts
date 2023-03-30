import { Observable } from "rxjs";

export interface IMenuService {
    getGenusList: () => Observable<any>;
}