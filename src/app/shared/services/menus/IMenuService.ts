import { Observable } from "rxjs";

export interface IMenuService {
    getGenusList: () => Observable<any>;
    getGenus(genusId: number | null | undefined): Observable<any>; 
}